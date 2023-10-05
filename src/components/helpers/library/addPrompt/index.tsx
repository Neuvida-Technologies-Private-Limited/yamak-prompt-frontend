import { useState } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';
import { promptModalState } from 'middleware/state/library';
import { message } from 'antd';

import { Button, Input, Modal, TextArea } from 'components/common';
import {
  Library,
  InputVariants,
  ButtonVariants,
  TextAreaVariants,
} from 'utils/constants';

const AddNewPrompt: React.FC<{
  onAddPrompt?: (prompt: string) => Promise<any>;
}> = ({ onAddPrompt }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [state, setState] = useRecoilState(promptModalState);
  const resetState = useResetRecoilState(promptModalState);
  const { title, userMessage, systemMessage, promptOutput, tags } = state;

  const addPromptHandler: React.MouseEventHandler = () => {
    setShowModal(prev => !prev);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setState(old => ({
      ...old,
      [fieldName]: value,
    }));
  };

  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    if (!title || !userMessage || !systemMessage || !promptOutput || !tags) {
      message.error('Fields cannot be empty');
      return;
    }

    const prompt = {
      title,
      user_message: userMessage,
      system_message: systemMessage,
      is_public: false,
      liked_by_user: true,
      sample_output: promptOutput,
      tags,
    };

    const res = await onAddPrompt?.(JSON.stringify(prompt));

    if (res.status_code !== 201) return message.error(res.error);

    message.success(res.data);
    setShowModal(false);
    resetState();
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
        cancelModalHandler={() => {
          setShowModal(false);
          resetState();
        }}
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
                onChange={value =>
                  handleInputChange(Library.NewPromptTitle, value)
                }
                variant={InputVariants.Filled}
              />
              <Input
                id={Library.UserMessageTitle}
                name={Library.UserMessageTitle}
                placeholder={Library.UserMessagePlaceholder}
                value={userMessage}
                onChange={value =>
                  handleInputChange(Library.UserMessageTitle, value)
                }
                variant={InputVariants.Filled}
              />
              <Input
                id={Library.SystemMessageTitle}
                name={Library.SystemMessageTitle}
                placeholder={Library.SystemMessagePlaceholder}
                value={systemMessage}
                onChange={value =>
                  handleInputChange(Library.SystemMessageTitle, value)
                }
                variant={InputVariants.Filled}
              />
              <TextArea
                rows={6}
                id={Library.WritePromptTitle}
                name={Library.WritePromptTitle}
                placeholder={Library.WritePromptPlaceholder}
                value={promptOutput}
                variant={TextAreaVariants.FILLED}
                onChange={event =>
                  handleInputChange(
                    Library.WritePromptTitle,
                    event.target.value
                  )
                }
              />
              <Input
                id={Library.TagsTitle}
                name={Library.TagsTitle}
                placeholder={Library.TagsPlaceholder}
                value={tags}
                onChange={value => handleInputChange(Library.TagsTitle, value)}
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
