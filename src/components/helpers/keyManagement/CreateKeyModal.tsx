import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Modal, Select } from 'components/common';
import { KeyManagement, InputVariants } from 'utils/constants';
import { CreateKey, GetLLMProviders } from 'middleware/api';
import { keyManagementstate } from 'middleware/state';

interface OptionItems {
  value: string;
  label: string;
}

const CreateKeyModal: React.FC = () => {
  const [state, setState] = useRecoilState(keyManagementstate);
  // destructuring params
  const { title, description, api_key, provider } = state;
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
    }));
  };
  const resetKeyManagementState = useResetRecoilState(keyManagementstate);
  const addKeyButtonHandler = () => {
    setShowModal(prev => !prev);
    resetKeyManagementState();
  };

  const inputFields = [
    {
      id: KeyManagement.KEY_TITLE,
      name: KeyManagement.KEY_TITLE,
      placeholder: KeyManagement.TITLE_PLACEHOLDER,
      onChange: (value: string) =>
        handleInputChange(KeyManagement.KEY_TITLE, value),
    },
    {
      id: KeyManagement.KEY_DESCRIPTION,
      name: KeyManagement.KEY_DESCRIPTION,
      placeholder: KeyManagement.DESCRIPTION_PLACEHOLDER,
      onChange: (value: string) =>
        handleInputChange(KeyManagement.KEY_DESCRIPTION, value),
    },
    {
      id: KeyManagement.API_KEY,
      name: KeyManagement.API_KEY,
      placeholder: KeyManagement.SK_PLACEHOLDER,
      onChange: (value: string) =>
        handleInputChange(KeyManagement.API_KEY, value),
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
  //API call to create Key
  const createKey = async () => {
    const keyManagementParams = {
      title,
      description,
      api_key,
      provider,
    };
    try {
      await CreateKey(keyManagementParams);
      toast.success('Key created successfully');
      resetKeyManagementState();
    } catch (error: any) {
      const errorMessage = error.error;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getLLMProviderList();
  }, []);

  return (
    <>
      <Button
        size={'middle'}
        type={'default'}
        shape={'default'}
        onClick={addKeyButtonHandler}
        name={KeyManagement.ADD_KEY_BUTTON}
        className="bg-primary text-white hover:!text-white border-none !py-5 !px-3 hover:bg-primary700"
      />

      <Modal
        title={KeyManagement.TITLE}
        centered={true}
        isOpen={showModal}
        sumbitHandler={createKey}
        cancelModalHandler={() => setShowModal(false)}
        okText={KeyManagement.OK}
      >
        <div className="flex flex-col">
          <p className="text-gray400 pb-3">{KeyManagement.SUB_HEAD}</p>
          <form action="#" method="post">
            <div className="mt-5">
              {inputFields.map((input, i) => (
                <Input
                  key={i}
                  id={input.id}
                  name={input.name}
                  placeholder={input.placeholder}
                  onChange={input.onChange}
                  variant={InputVariants.Filled}
                />
              ))}
            </div>
            <div className="w-full">
              <Select
                options={options}
                placeholder={KeyManagement.LLM_PLACEHOLDER}
                className="filled w-full"
                size="large"
                onChange={handleSelectChange}
              />
            </div>
          </form>
        </div>
        <ToastContainer />
      </Modal>
    </>
  );
};

export default CreateKeyModal;
