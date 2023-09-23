import { useState } from 'react';
import { Button, Input, Modal, Select } from 'components/common';
import {
  KeyManagement,
  InputVariants,
  KeyManagementSelectOptions,
} from 'utils/constants';

const CreateKeyModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const addKeyButtonHandler = () => {
    setShowModal(prev => !prev);
  };

  const titleChangeHandler = () => {};
  const llmChangeHandler = () => {};
  const skChangeHandler = () => {};

  const inputFields = [
    {
      id: KeyManagement.KEY_TITLE,
      name: KeyManagement.KEY_TITLE,
      placeholder: KeyManagement.TITLE_PLACEHOLDER,
      onChange: titleChangeHandler,
    },
    {
      id: KeyManagement.KEY_DESCRIPTION,
      name: KeyManagement.KEY_DESCRIPTION,
      placeholder: KeyManagement.DESCRIPTION_PLACEHOLDER,
      onChange: llmChangeHandler,
    },
    {
      id: KeyManagement.SK_TITLE,
      name: KeyManagement.SK_TITLE,
      placeholder: KeyManagement.SK_PLACEHOLDER,
      onChange: skChangeHandler,
    },
  ];

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
        showModalHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={KeyManagement.OK}
        cancelText={KeyManagement.CANCEL}
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
                options={KeyManagementSelectOptions}
                placeholder={KeyManagement.LLM_PLACEHOLDER}
                className="filled w-full"
                size="large"
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateKeyModal;
