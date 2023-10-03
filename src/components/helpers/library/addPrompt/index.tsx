import { useState } from 'react';
import { Button, Input, Modal, TextArea } from 'components/common';
import { Library, InputVariants, ButtonVariants } from 'utils/constants';
import { toast } from 'react-toastify';
import { PromptModal } from 'middleware/api/types';

const AddNewPrompt: React.FC<{ onAddPrompt?: (prompt: PromptModal) => {} }> = ({
  onAddPrompt,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [systemMessage, setSystemMessage] = useState('');
  const [promptOutput, setPromptOutput] = useState('');
  const [tags, setTags] = useState('');

  const addPromptHandler: React.MouseEventHandler = () => {
    setShowModal(prev => !prev);
  };

  function reset() {
    setTitle('');
    setUserMessage('');
    setSystemMessage('');
    setPromptOutput('');
    setTags('');
  }

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    if (!title || !userMessage || !systemMessage || !promptOutput || !tags) {
      toast.error('Fields cannot be empty');
      return console.log('Fields cannot be empty');
    }

    const prompt: PromptModal = {
      title,
      user_message: userMessage,
      system_message: systemMessage,
      is_public: false,
      sample_output: promptOutput,
      tags,
    };

    onAddPrompt?.(prompt);
    toast.success('Prompt created successfully');
    setShowModal(false);
    reset();
  }

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
        sumbitHandler={submitHandler}
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
                value={title}
                onChange={setTitle}
                variant={InputVariants.Filled}
              />
              <Input
                id={Library.UserMessageTitle}
                name={Library.UserMessageTitle}
                placeholder={Library.UserMessagePlaceholder}
                value={userMessage}
                onChange={setUserMessage}
                variant={InputVariants.Filled}
              />
              <Input
                id={Library.SystemMessageTitle}
                name={Library.SystemMessageTitle}
                placeholder={Library.SystemMessagePlaceholder}
                value={systemMessage}
                onChange={setSystemMessage}
                variant={InputVariants.Filled}
              />
              <TextArea
                rows={6}
                id={Library.WritePromptTitle}
                name={Library.WritePromptTitle}
                placeholder={Library.WritePromptPlaceholder}
                value={promptOutput}
                onChange={e => setPromptOutput(e.target.value)}
                className="p-3 w-full bg-gray50 mb-4"
              />
              <Input
                id={Library.TagsTitle}
                name={Library.TagsTitle}
                placeholder={Library.TagsPlaceholder}
                value={tags}
                onChange={setTags}
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
