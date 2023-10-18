import { useRecoilState } from 'recoil';
import { message } from 'antd';

import { WorkspaceChatInputs, WorkspaceChatOutput } from 'components/helpers';
import { GenerateOutput } from 'middleware/api';
import {
  generateChatOutputState,
  workspaceInfoState,
  workspaceChatOutputs,
} from 'middleware/state';

const Chat = () => {
  // const isDekstopView = window.innerWidth >= 768;
  const [chatOutputState, setChatOutputState] = useRecoilState(
    generateChatOutputState
  );
  const [chatOutputs, setChatOutputs] = useRecoilState(workspaceChatOutputs);
  const [{ id }] = useRecoilState(workspaceInfoState);

  const {
    system_message,
    title,
    user_message,
    is_public,
    bookmarked,
    prompt_type,
    tags,
  } = chatOutputState;

  async function submitHandler() {
    try {
      const requestObj = {
        workspace: id,
        system_message,
        user_message,
        title,
        is_public,
        bookmarked,
        prompt_type,
        tags,
        parameters: {
          temperature: chatOutputState.parameters.temperature,
          max_tokens: chatOutputState.parameters.max_tokens,
        },
      };

      if (!system_message || !title || !user_message) return;

      setChatOutputs(old => ({ ...old, isLoading: true }));

      const res = await GenerateOutput(requestObj);
      const output = res.data.prompt_output.join('. ');

      setChatOutputs(old => ({
        ...old,
        isLoading: false,
        chats: [{ user_message, output }, ...chatOutputs.chats],
      }));
      setChatOutputState(old => ({ ...old, user_message: '' }));
    } catch (err) {}
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 h-full gap-x-4 sm:gap-y-4 py-4">
      {/* {isDekstopView ? <WorkspaceHistory id={undefined} /> : null} */}
      <WorkspaceChatInputs />
      <WorkspaceChatOutput onSubmit={submitHandler} />
    </div>
  );
};

export default Chat;
