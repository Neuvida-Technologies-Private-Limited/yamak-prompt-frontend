import { useState } from 'react';
import { Button, Input, Modal } from 'components/common';
import { KeyManagement, InputVariants } from 'utils/constants';

const CreateKeyModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const addKeyButtonHandler = () => {
    setShowModal(prev => !prev);
  };
  const titleChangeHandler = () => {};
  const llmChangeHandler = () => {};
  const skChangeHandler = () => {};

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
              <Input
                id={KeyManagement.KEY_TITLE}
                name={KeyManagement.KEY_TITLE}
                placeholder={KeyManagement.TITLE_PLACEHOLDER}
                onChange={titleChangeHandler}
                variant={InputVariants.Filled}
              />
              <Input
                id={KeyManagement.LLM_TITLE}
                name={KeyManagement.LLM_TITLE}
                placeholder={KeyManagement.LLM_PLACEHOLDER}
                onChange={llmChangeHandler}
                variant={InputVariants.Filled}
              />
              <Input
                id={KeyManagement.SK_TITLE}
                name={KeyManagement.SK_TITLE}
                placeholder={KeyManagement.SK_PLACEHOLDER}
                onChange={skChangeHandler}
                variant={InputVariants.Filled}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateKeyModal;
