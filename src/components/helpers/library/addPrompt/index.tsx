import { useState } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';
import { promptModalState } from 'middleware/state/library';
import { message } from 'antd';

import { Button, Input, Modal, TextArea } from 'components/common';
import {
  Library,
  LibraryAddPrompt,
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
  const {
    title,
    titleError,
    userMessage,
    userMessageError,
    systemMessage,
    systemMessageError,
    promptOutput,
    promptOutputError,
    tags,
    tagsError,
  } = state;

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

    setState(old => ({
      ...old,
      titleError: !title ? LibraryAddPrompt.NoTitleMessage : '',
      userMessageError: !userMessage ? LibraryAddPrompt.NoUserMessage : '',
      systemMessageError: !systemMessage
        ? LibraryAddPrompt.NoSystemMessage
        : '',
      promptOutputError: !promptOutput ? LibraryAddPrompt.NoSampleOutput : '',
      tagsError: !tags ? LibraryAddPrompt.NoTags : '',
    }));

    if (!title || !userMessage || !systemMessage || !promptOutput || !tags)
      return;

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
              <div className="flex flex-col">
                <label
                  htmlFor={Library.NewPromptTitle}
                  className="pl-2 font-poppins text-gray300"
                >
                  {Library.TitlePlaceholder}
                </label>
                <Input
                  id={Library.NewPromptTitle}
                  name={Library.NewPromptTitle}
                  value={title}
                  onChange={value =>
                    handleInputChange(Library.NewPromptTitle, value)
                  }
                  variant={InputVariants.Filled}
                  error={titleError}
                />
              </div>
              <div>
                <label
                  htmlFor={Library.UserMessageTitle}
                  className="pl-2 font-poppins text-gray300"
                >
                  {Library.UserMessagePlaceholder}
                </label>
                <Input
                  id={Library.UserMessageTitle}
                  name={Library.UserMessageTitle}
                  value={userMessage}
                  onChange={value =>
                    handleInputChange(Library.UserMessageTitle, value)
                  }
                  variant={InputVariants.Filled}
                  error={userMessageError}
                />
              </div>
              <div>
                <label
                  htmlFor={Library.SystemMessageTitle}
                  className="pl-2 font-poppins text-gray300"
                >
                  {Library.SystemMessagePlaceholder}
                </label>

                <Input
                  id={Library.SystemMessageTitle}
                  name={Library.SystemMessageTitle}
                  value={systemMessage}
                  onChange={value =>
                    handleInputChange(Library.SystemMessageTitle, value)
                  }
                  variant={InputVariants.Filled}
                  error={systemMessageError}
                />
              </div>
              <div>
                <label
                  htmlFor={Library.WritePromptTitle}
                  className="pl-2 font-poppins text-gray300"
                >
                  {Library.WritePromptPlaceholder}
                </label>
                <TextArea
                  rows={6}
                  id={Library.WritePromptTitle}
                  name={Library.WritePromptTitle}
                  value={promptOutput}
                  variant={TextAreaVariants.FILLED}
                  onChange={event =>
                    handleInputChange(
                      Library.WritePromptTitle,
                      event.target.value
                    )
                  }
                  error={promptOutputError}
                />
              </div>
              <div>
                <label
                  htmlFor={Library.TagsTitle}
                  className="pl-2 font-poppins text-gray300"
                >
                  {Library.TagsPlaceholder}
                </label>

                <Input
                  id={Library.TagsTitle}
                  name={Library.TagsTitle}
                  value={tags}
                  onChange={value =>
                    handleInputChange(Library.TagsTitle, value)
                  }
                  variant={InputVariants.Filled}
                  error={tagsError}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddNewPrompt;
