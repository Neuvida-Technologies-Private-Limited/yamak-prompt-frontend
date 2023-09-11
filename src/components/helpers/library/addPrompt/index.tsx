import { useState } from 'react';
import { Button, Input, Modal, Select, TextArea } from 'components/common';
import { LibrarySelectOptions, Library } from 'utils/constants';

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
        type="default"
        shape="default"
        onClick={addPromptHandler}
        className="bg-primary text-white hover:!text-white border-none !py-5 !px-3 hover:bg-primary700"
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
                className="p-3 w-full bg-gray50 mb-4"
                placeholder={Library.TitlePlaceholder}
                onChange={titleChangeHandler}
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
                style={{}}
                size="large"
                className="library w-full mb-4"
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddNewPrompt;
