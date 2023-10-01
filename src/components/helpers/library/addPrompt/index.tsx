import { useState } from 'react';
import { Button, Input, Modal, TextArea } from 'components/common';
import { Library, InputVariants, ButtonVariants } from 'utils/constants';

const AddNewPrompt = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const addPromptHandler: React.MouseEventHandler = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <Button
        size="small"
        variant={ButtonVariants.PRIMARY}
        onClick={addPromptHandler}
        name={Library.AddPromptButton}
      />
      <Modal
        title={Library.ModalHeading}
        centered={true}
        isOpen={showModal}
        sumbitHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={Library.OkText}
        className="library"
      >
        <div className="flex flex-col">
          <p className="text-gray400">{Library.SubHead}</p>
          <form action="#" method="post">
            <div className="mt-5">
              <Input
                id={Library.NewPromptTitle}
                name={Library.NewPromptTitle}
                placeholder={Library.TitlePlaceholder}
                onChange={() => {}}
                variant={InputVariants.Filled}
              />
              <Input
                id={Library.UserMessageTitle}
                name={Library.UserMessageTitle}
                placeholder={Library.UserMessagePlaceholder}
                onChange={() => {}}
                variant={InputVariants.Filled}
              />
              <Input
                id={Library.SystemMessageTitle}
                name={Library.SystemMessageTitle}
                placeholder={Library.SystemMessagePlaceholder}
                onChange={() => {}}
                variant={InputVariants.Filled}
              />
              <TextArea
                rows={6}
                id={Library.WritePromptTitle}
                name={Library.WritePromptTitle}
                placeholder={Library.WritePromptPlaceholder}
                onChange={() => {}}
                className="p-3 w-full bg-gray50 mb-4"
              />
              <Input
                id={Library.TagsTitle}
                name={Library.TagsTitle}
                placeholder={Library.TagsPlaceholder}
                onChange={() => {}}
                variant={InputVariants.Filled}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddNewPrompt;
