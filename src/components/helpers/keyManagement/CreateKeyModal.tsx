import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Modal, Select } from 'components/common';
import { KeyManagement, InputVariants, ButtonVariants } from 'utils/constants';
import { GetLLMProviders } from 'middleware/api';
import { createKeystate } from 'middleware/state';

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
    },
    {
      id: KeyManagement.KEY_DESCRIPTION,
      name: KeyManagement.KEY_DESCRIPTION,
      placeholder: KeyManagement.DESCRIPTION_PLACEHOLDER,
      value: description,
      onChange: (value: string) =>
        handleInputChange(KeyManagement.KEY_DESCRIPTION, value),
    },
    {
      id: KeyManagement.API_KEY,
      name: KeyManagement.API_KEY,
      placeholder: KeyManagement.SK_PLACEHOLDER,
      value: api_key,
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
  const handleSubmit = async () => {
    if (await createKey()) {
      setShowModal(false);
    } else {
      toast.error('Error in creating key or token expired, Login again !');
    }
    resetState();
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
                  value={input.value}
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
      </Modal>
    </>
  );
};

export default CreateKeyModal;
