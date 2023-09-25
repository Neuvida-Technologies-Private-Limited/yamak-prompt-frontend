import { useState } from 'react';
import { Button, Input, Modal, Select, TextArea } from 'components/common';
import { LibrarySelectOptions, Library, InputVariants } from 'utils/constants';

const AddNewPrompt = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const addPromptHandler: React.MouseEventHandler = () => {
    setShowModal(prev => !prev);
  };
  const titleChangeHandler = () => {};
  const writePromptHandler = () => {};

  return (
    <>
      <Button
        size="small"
        variant="primary"
        onClick={addPromptHandler}
        name={Library.AddPromptButton}
      />
      <Modal
        title={Library.ModalHeading}
        centered={true}
        isOpen={showModal}
        showModalHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={Library.OkText}
        className="library"
      >
        <div className="flex flex-col">
          <p className="text-gray400 pb-3">{Library.SubHead}</p>
          <form action="#" method="post">
            <div className="mt-5">
              <Input
                id={Library.NewPromptTitle}
                name={Library.NewPromptTitle}
                placeholder={Library.TitlePlaceholder}
                onChange={titleChangeHandler}
                variant={InputVariants.Filled}
              />
              <TextArea
                rows={6}
                id={Library.WritePromptTitle}
                name={Library.WritePromptTitle}
                placeholder={Library.WritePromptPlaceholder}
                maxLength={20}
                onChange={writePromptHandler}
                className="p-3 w-full bg-gray50 mb-4"
              />
              <Select
                options={LibrarySelectOptions}
                placeholder={Library.SelectTopicPlaceholder}
                size="large"
                className="filled w-full mb-4"
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddNewPrompt;
