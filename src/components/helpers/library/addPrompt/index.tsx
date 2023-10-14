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
  } = state;

  const addPromptHandler: React.MouseEventHandler = () => {
    setShowModal(prev => !prev);
  };

  function titleHandler(value: string) {
    setState(old => ({
      ...old,
      title: value,
      titleError: value === '' ? LibraryAddPrompt.NoTitleMessage : '',
    }));
  }

  function userMessageHandler(value: string) {
    setState(old => ({
      ...old,
      userMessage: value,
      userMessageError: value === '' ? LibraryAddPrompt.NoUserMessage : '',
    }));
  }

  function systemMessageHandler(value: string) {
    setState(old => ({
      ...old,
      systemMessage: value,
      systemMessageError: value === '' ? LibraryAddPrompt.NoSystemMessage : '',
    }));
  }

  function sampleOutputHandler(value: string) {
    setState(old => ({
      ...old,
      promptOutput: value,
      promptOutputError: value === '' ? LibraryAddPrompt.NoSampleOutput : '',
    }));
  }

  function tagsHandler(value: string) {
    setState(old => ({
      ...old,
      tags: value,
    }));
  }

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
    }));

    if (!title || !userMessage || !systemMessage || !promptOutput) return;

    const prompt = {
      title,
      user_message: userMessage,
      system_message: systemMessage,
      is_public: false,
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
                  onChange={titleHandler}
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
                  onChange={userMessageHandler}
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
                  onChange={systemMessageHandler}
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
                  onChange={event => sampleOutputHandler(event.target.value)}
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
                  onChange={tagsHandler}
                  variant={InputVariants.Filled}
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
