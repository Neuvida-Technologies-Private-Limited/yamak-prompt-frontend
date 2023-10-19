import { useRecoilState } from 'recoil';
import { message } from 'antd';

import { WorkspaceChatInputs, WorkspaceChatOutput } from 'components/helpers';
import { GenerateOutput, GetWorkspaceHistory } from 'middleware/api';
import {
  generateChatOutputState,
  workspaceInfoState,
  workspaceChatOutputs,
} from 'middleware/state';
import { useCallback, useEffect } from 'react';

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
      const chatOutParams = {
        workspace: id,
        system_message: 'System message',
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

      if (!title || !user_message) return;

      setChatOutputs(old => ({ ...old, isLoading: true }));

      const res = await GenerateOutput(chatOutParams);

      if (res.status !== 201) {
        message.error(
          'Error getting response. Please try again after some time'
        );
        return;
      }

      setChatOutputs(old => ({
        ...old,
        isLoading: false,
        chats: [...chatOutputs.chats, res.data],
      }));
      setChatOutputState(old => ({ ...old, user_message: '' }));
    } catch (err) {}
  }

  const getChatHistory = useCallback(
    async function (currentPage?: number) {
      try {
        const res = await GetWorkspaceHistory(id, 1, 'chat');

        if (res.status !== 200) {
          message.error('Problem getting previous chats');
          return;
        }

        const reversedResults = [...res.data.results].reverse();
        setChatOutputs(old => ({ ...old, chats: reversedResults }));
      } catch (error: any) {}
    },
    [id, setChatOutputs]
  );

  console.log(chatOutputs);

  useEffect(() => {
    getChatHistory();
  }, [getChatHistory]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 h-full gap-x-4 sm:gap-y-4 py-4">
      {/* {isDekstopView ? <WorkspaceHistory id={undefined} /> : null} */}
      {/* <WorkspaceChatInputs /> */}
      <WorkspaceChatOutput onSubmit={submitHandler} />
    </div>
  );
};

export default Chat;
