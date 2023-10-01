import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Modal, Select } from 'components/common';
import { KeyManagement, InputVariants, ButtonVariants } from 'utils/constants';
import { GetLLMProviders, TestConnection } from 'middleware/api';
import { createKeystate } from 'middleware/state';
import {
  IsCreateKeyFormValidated,
  isKeyDescriptionValidated,
  isKeyTitleValidated,
  isKeyValidated,
  isLLMProviderValidated,
} from 'utils/validations';
import { message } from 'antd';

interface OptionItems {
  value: string;
  label: string;
}
interface CreateKeyModalProps {
  createKey: () => Promise<boolean>;
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
  } = state;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [options, setOptions] = useState<OptionItems[]>([]);

  const handleInputChange = (fieldName: string, value: string) => {
    setState(old => ({
      ...old,
      [fieldName]: value,
    }));
  };
  const handleSelectChange = (value: string) => {
    setState(old => ({
      ...old,
      provider: value,
      providerError: isLLMProviderValidated(value),
    }));
  };
  const addKeyButtonHandler = () => {
    setShowModal(prev => !prev);
  };

  const inputFields = [
    {
      id: KeyManagement.KEY_TITLE,
      name: KeyManagement.KEY_TITLE,
      placeholder: KeyManagement.TITLE_PLACEHOLDER,
      value: title,
      onChange: (value: string) =>
        handleInputChange(KeyManagement.KEY_TITLE, value),
      error: titleError,
    },
    {
      id: KeyManagement.KEY_DESCRIPTION,
      name: KeyManagement.KEY_DESCRIPTION,
      placeholder: KeyManagement.DESCRIPTION_PLACEHOLDER,
      value: description,
      onChange: (value: string) =>
        handleInputChange(KeyManagement.KEY_DESCRIPTION, value),
      error: descriptionError,
    },
    {
      id: KeyManagement.API_KEY,
      name: KeyManagement.API_KEY,
      placeholder: KeyManagement.SK_PLACEHOLDER,
      value: api_key,
      onChange: (value: string) =>
        handleInputChange(KeyManagement.API_KEY, value),
      error: api_keyError,
    },
  ];

  //API call to get all LLM Providers
  const getLLMProviderList = async () => {
    try {
      const res = await GetLLMProviders();
      //modifying API data
      if (Array.isArray(res)) {
        const providerSelectOptions = res.map((item: string) => ({
          value: item,
          label: item,
        }));
        setOptions(providerSelectOptions);
      }
    } catch (error: any) {
      toast.error('error in getting llm provider');
    }
  };
  //API to test key connection
  const handleKeyConnection = async () => {
    const testConnectionParams = {
      api_key,
      provider,
    };
    try {
      const res = await TestConnection(testConnectionParams);
      message.success(res);
    } catch (error: any) {
      message.error(error.error);
    }
  };
  //API call to create Key
  const handleSubmit = async () => {
    setState(old => ({
      ...old,
      isLoading: true,
      titleError: isKeyTitleValidated(title),
      descriptionError: isKeyDescriptionValidated(description),
      api_keyError: isKeyValidated(api_key),
      providerError: isLLMProviderValidated(provider),
    }));

    if (!IsCreateKeyFormValidated(title, description, api_key, provider)) {
      return;
    }

    if (await createKey()) {
      setShowModal(false);
      resetState();
    } else {
      toast.error('Error in creating key or token expired, Login again !');
    }
  };

  useEffect(() => {
    getLLMProviderList();
  }, []);

  return (
    <>
      <Button
        size={'small'}
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
                <div className="flex flex-col">
                  <label htmlFor="" className="pl-2 font-poppins text-gray300">
                    {input.placeholder}
                  </label>
                  <Input
                    key={i}
                    id={input.id}
                    name={input.name}
                    onChange={input.onChange}
                    value={input.value}
                    variant={InputVariants.Filled}
                    error={input.error}
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
                variant={ButtonVariants.LINK}
                name={KeyManagement.TestConnection}
                className="!text-secondary !decoration-secondary "
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
