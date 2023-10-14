import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { Button, Input, Modal, Select } from 'components/common';
import { KeyManagement, InputVariants, ButtonVariants } from 'utils/constants';
import { getLLMProviders, testConnection } from 'middleware/api';
import { createKeystate } from 'middleware/state';
import {
  IsCreateKeyFormValidated,
  isKeyDescriptionValidated,
  isKeyTitleValidated,
  isKeyValidated,
  isLLMProviderValidated,
} from 'utils/validations';
import { CreateKeyModal as KeyModal } from 'middleware/api/types';

interface OptionItems {
  value: string;
  label: string;
}
interface CreateKeyModalProps {
  createKey: (key: KeyModal) => Promise<any>;
}

const CreateKeyModal: React.FC<CreateKeyModalProps> = ({ createKey }) => {
  const [state, setState] = useRecoilState(createKeystate);
  const resetState = useResetRecoilState(createKeystate);
  // destructuring params
  const {
    title,
    description,
    api_key,
    provider,
    titleError,
    descriptionError,
    api_keyError,
    providerError,
    isApiKeyValid,
  } = state;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [options, setOptions] = useState<OptionItems[]>([]);

  const addKeyButtonHandler = () => {
    setShowModal(prev => !prev);
  };

  function titleChangeHandler(value: string) {
    setState(old => ({
      ...old,
      title: value,
      titleError: isKeyTitleValidated(value),
    }));
  }

  function descriptionChangeHandler(value: string) {
    setState(old => ({
      ...old,
      description: value,
      descriptionError: isKeyDescriptionValidated(value),
    }));
  }

  function apiKeyChangeHandler(value: string) {
    setState(old => ({
      ...old,
      api_key: value,
      api_keyError: isKeyValidated(value),
    }));
  }

  const handleSelectChange = (value: string) => {
    setState(old => ({
      ...old,
      provider: value,
      providerError: isLLMProviderValidated(value),
    }));
  };

  const inputFields = [
    {
      id: KeyManagement.KEY_TITLE,
      type: 'text',
      name: KeyManagement.KEY_TITLE,
      placeholder: KeyManagement.TITLE_PLACEHOLDER,
      value: title,
      disabled: false,
      onChange: titleChangeHandler,
      error: titleError,
    },
    {
      id: KeyManagement.KEY_DESCRIPTION,
      type: 'text',
      name: KeyManagement.KEY_DESCRIPTION,
      placeholder: KeyManagement.DESCRIPTION_PLACEHOLDER,
      value: description,
      disabled: false,
      onChange: descriptionChangeHandler,
      error: descriptionError,
    },
    {
      id: KeyManagement.API_KEY,
      type: 'password',
      name: KeyManagement.API_KEY,
      placeholder: KeyManagement.SK_PLACEHOLDER,
      value: api_key,
      disabled: isApiKeyValid,
      onChange: apiKeyChangeHandler,
      error: api_keyError,
    },
  ];

  const getLLMProviderList = async () => {
    try {
      const res = await getLLMProviders();
      const providerSelectOptions = res.map((item: string) => ({
        value: item,
        label: item,
      }));
      setOptions(providerSelectOptions);
    } catch (err: any) {
      message.error(err.error);
    }
  };

  const handleKeyConnection = async () => {
    const testConnectionParams = {
      api_key,
      provider,
    };
    try {
      if (!api_key) {
        setState(old => ({ ...old, api_keyError: isKeyValidated(api_key) }));
        return;
      }

      if (!provider) {
        setState(old => ({
          ...old,
          providerError: isLLMProviderValidated(provider),
        }));
        return;
      }

      const res = await testConnection(testConnectionParams);
      message.success(res);
      setState(old => ({ ...old, isApiKeyValid: true, api_keyError: '' }));
    } catch (error: any) {
      setState(old => ({
        ...old,
        isApiKeyValid: false,
        api_keyError: 'Valid key is required',
      }));
    }
  };

  const handleSubmit = async () => {
    if (!isApiKeyValid) {
      message.error('Please validate key before submitting');
      return;
    }

    setState(old => ({
      ...old,
      isLoading: true,
      titleError: isKeyTitleValidated(title),
      descriptionError: isKeyDescriptionValidated(description),
      api_keyError: isKeyValidated(api_key),
      providerError: isLLMProviderValidated(provider),
    }));

    if (!IsCreateKeyFormValidated(title, description, api_key, provider))
      return;

    const keyObj: KeyModal = {
      title,
      description,
      api_key,
      provider,
    };

    await createKey(keyObj);
    message.success(`Key created successfully`);
    setShowModal(false);
    resetState();
  };

  useEffect(() => {
    getLLMProviderList();
  }, []);

  return (
    <>
      <Button
        variant={ButtonVariants.PRIMARY}
        onClick={addKeyButtonHandler}
        name={KeyManagement.ADD_KEY_BUTTON}
      />

      <Modal
        title={KeyManagement.TITLE}
        centered={true}
        isOpen={showModal}
        sumbitHandler={handleSubmit}
        cancelModalHandler={() => {
          setShowModal(false);
          resetState();
        }}
        okText={KeyManagement.OK}
        cancelText="Cancel"
        className="keyManagement"
      >
        <div className="flex flex-col">
          <p className="text-gray400 pb-3">{KeyManagement.SUB_HEAD}</p>
          <form action="#" method="post">
            <div className="mt-5">
              {inputFields.map((input, i) => (
                <div
                  key={`create-key-input-item-${i}`}
                  className="flex flex-col"
                >
                  <label htmlFor="" className="pl-2 font-poppins text-gray300">
                    {input.placeholder}
                  </label>
                  <Input
                    key={i}
                    id={input.id}
                    type={input.type}
                    name={input.name}
                    onChange={input.onChange}
                    value={input.value}
                    variant={InputVariants.Filled}
                    error={input.error}
                    disabled={input.disabled}
                  />
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="" className="pl-2 font-poppins text-gray300">
                {KeyManagement.LLM_PLACEHOLDER}
              </label>
              <Select
                options={options}
                value={provider}
                placeholder={KeyManagement.LLM_PLACEHOLDER}
                className="filled w-full"
                size="large"
                onChange={handleSelectChange}
                error={providerError}
              />
            </div>
            <div className="flex justify-end w-full mt-4">
              <Button
                size={undefined}
                variant={ButtonVariants.SECONDARY_LINK}
                name={KeyManagement.TestConnection}
                onClick={handleKeyConnection}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateKeyModal;
