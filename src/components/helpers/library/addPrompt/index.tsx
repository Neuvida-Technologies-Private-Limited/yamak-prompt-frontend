import { useState } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';
import { promptModalState } from 'middleware/state/library';
import { message } from 'antd';

import {
  Button,
  CharacterCounterInput,
  Modal,
  TextArea,
} from 'components/common';
import {
  Library,
  LibraryAddPrompt,
  InputVariants,
  ButtonVariants,
  TextAreaVariants,
} from 'utils/constants';
import ChipContainer from './ChipContainer';
import { isInputValidated } from 'utils/validations';

const AddNewPrompt: React.FC<{
  onAddPrompt?: (prompt: string) => Promise<any>;
}> = ({ onAddPrompt }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [state, setState] = useRecoilState(promptModalState);
  const resetState = useResetRecoilState(promptModalState);
  const {
    title,
    titleError,
    titleLimit,
    userMessage,
    userMessageError,
    userMessageLimit,
    systemMessage,
    systemMessageError,
    systemMessageLimit,
    promptOutput,
    promptOutputError,
    promptOutputLimit,
    tags,
  } = state;

  const addPromptHandler: React.MouseEventHandler = () => {
    setShowModal(prev => !prev);
  };

  function titleHandler(value: string) {
    setState(old => ({
      ...old,
      title: value,
      titleError: isInputValidated(value, LibraryAddPrompt.NO_TITLE_MESSAGE),
    }));
  }

  function userMessageHandler(value: string) {
    setState(old => ({
      ...old,
      userMessage: value,
      userMessageError: isInputValidated(
        value,
        LibraryAddPrompt.NO_USER_MESSAGE
      ),
    }));
  }

  function systemMessageHandler(value: string) {
    setState(old => ({
      ...old,
      systemMessage: value,
      systemMessageError: isInputValidated(
        value,
        LibraryAddPrompt.NO_SYSTEM_MESSAGE
      ),
    }));
  }

  function sampleOutputHandler(value: string) {
    setState(old => ({
      ...old,
      promptOutput: value,
      promptOutputError: isInputValidated(
        value,
        LibraryAddPrompt.NO_PROMPT_OUTPUT
      ),
    }));
  }

  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    setState(old => ({
      ...old,
      titleError: isInputValidated(title, LibraryAddPrompt.NO_TITLE_MESSAGE),
      userMessageError: isInputValidated(
        userMessage,
        LibraryAddPrompt.NO_USER_MESSAGE
      ),
      systemMessageError: isInputValidated(
        systemMessage,
        LibraryAddPrompt.NO_SYSTEM_MESSAGE
      ),
      promptOutputError: isInputValidated(
        promptOutput,
        LibraryAddPrompt.NO_PROMPT_OUTPUT
      ),
    }));

    if (!title || !userMessage || !systemMessage || !promptOutput) return;

    const prompt = {
      title,
      user_message: userMessage,
      system_message: systemMessage,
      is_public: false,
      published: true,
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
              <div className="mb-3">
                <label
                  htmlFor={Library.NEW_PROMPT_TITLE}
                  className="pl-2 font-poppins text-gray300"
                >
                  {Library.TITLE_PLACEHOLDER}
                </label>
                <CharacterCounterInput
                  key={'1'}
                  id={Library.NEW_PROMPT_TITLE}
                  name={Library.NEW_PROMPT_TITLE}
                  value={title}
                  onChange={titleHandler}
                  variant={InputVariants.Filled}
                  error={titleError}
                  maxLength={titleLimit}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor={Library.USER_MESSAGE_TITLE}
                  className="pl-2 font-poppins text-gray300"
                >
                  {Library.USER_MESSAGE_PLACEHOLDER}
                </label>
                <CharacterCounterInput
                  key={'2'}
                  id={Library.USER_MESSAGE_TITLE}
                  name={Library.USER_MESSAGE_TITLE}
                  value={userMessage}
                  onChange={userMessageHandler}
                  variant={InputVariants.Filled}
                  error={userMessageError}
                  maxLength={userMessageLimit}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor={Library.SYSTEM_MESSAGE_TITLE}
                  className="pl-2 font-poppins text-gray300"
                >
                  {Library.SYSTEM_MESSAGE_PLACEHOLDER}
                </label>

                <CharacterCounterInput
                  key={'3'}
                  id={Library.SYSTEM_MESSAGE_TITLE}
                  name={Library.SYSTEM_MESSAGE_TITLE}
                  value={systemMessage}
                  onChange={systemMessageHandler}
                  variant={InputVariants.Filled}
                  error={systemMessageError}
                  maxLength={systemMessageLimit}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor={Library.WRITE_PROMPT_TITLE}
                  className="pl-2 font-poppins text-gray300"
                >
                  {Library.WRITE_PROMPT_PLACEHOLDER}
                </label>
                <TextArea
                  rows={6}
                  id={Library.WRITE_PROMPT_TITLE}
                  name={Library.WRITE_PROMPT_TITLE}
                  value={promptOutput}
                  variant={TextAreaVariants.FILLED}
                  onChange={event => sampleOutputHandler(event.target.value)}
                  error={promptOutputError}
                  maxLength={promptOutputLimit}
                />
              </div>
              <ChipContainer />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddNewPrompt;
