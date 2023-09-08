import { useState } from 'react';
import { Button, Input, Modal, Select, TextArea } from 'components/common';

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
        name="Add Prompt"
      />

      <Modal
        title={'Add Prompt'}
        centered={true}
        isOpen={showModal}
        showModalHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={'Add Prompt'}
        className="library"
      >
        <div className="flex flex-col">
          <p className="text-gray400 pb-3">
            {'Fill in the details of your prompt'}
          </p>
          <form action="#" method="post">
            <div className="mt-5">
              <Input
                id={'new-prompt-title'}
                name={'new-prompt-title'}
                className="p-3 w-full bg-gray50 mb-4"
                placeholder={'Enter prompt title'}
                onChange={titleChangeHandler}
              />
              <TextArea
                rows={6}
                placeholder="Write prompt (20 Characters)"
                maxLength={20}
                onChange={writePromptHandler}
                className="p-3 w-full bg-gray50 mb-4"
              />
              <Select
                options={[
                  { value: 'copywriting', label: 'Copywriting' },
                  { value: 'devops', label: 'Devops' },
                  { value: 'generate-ai', label: 'Generate AI' },
                ]}
                placeholder="Select Topic"
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
