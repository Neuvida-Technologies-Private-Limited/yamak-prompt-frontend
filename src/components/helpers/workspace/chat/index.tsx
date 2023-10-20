import { useCallback, useEffect, useMemo } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';
import { message } from 'antd';

import { WorkspaceChatInputs, WorkspaceChatOutput } from 'components/helpers';
import { GenerateOutput, GetWorkspaceHistory } from 'middleware/api';
import {
  generateChatOutputState,
  workspaceInfoState,
  workspaceChatOutputs,
} from 'middleware/state';
import { ITEMS_PER_PAGE } from 'utils/constants';

const Chat = () => {
  // const isDekstopView = window.innerWidth >= 768;
  const [chatOutputState, setChatOutputState] = useRecoilState(
    generateChatOutputState
  );
  const [{ chats, currentPage }, setChatOutputs] =
    useRecoilState(workspaceChatOutputs);
  const [{ id }] = useRecoilState(workspaceInfoState);
  const resetChatOutputs = useResetRecoilState(workspaceChatOutputs);

  const {
    system_message,
    title,
    user_message,
    is_public,
    bookmarked,
    prompt_type,
    tags,
    parameters,
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
          temperature: parameters.temperature,
          max_tokens: parameters.max_tokens,
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
        chats: [...old.chats, res.data],
      }));
      setChatOutputState(old => ({ ...old, user_message: '' }));
    } catch (err) {}
  }

  const getChatHistory = useCallback(
    async function (currentPage: number) {
      try {
        const res = await GetWorkspaceHistory(id, currentPage, 'chat');

        if (res.status !== 200) {
          message.error('Problem getting previous chats');
          return;
        }

        const reversedResults = [...res.data.results].reverse();
        setChatOutputs(old => ({
          ...old,
          chats: [...reversedResults],
          count: res.data.count,
          hasNext: res.data.next,
          hasPrevious: res.data.previous,
          totalPages: Math.ceil(res.data.count / ITEMS_PER_PAGE),
        }));
      } catch (error: any) {}
    },
    [id, setChatOutputs]
  );

  useEffect(() => {
    getChatHistory(currentPage);
  }, [getChatHistory, currentPage]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 h-full gap-x-4 sm:gap-y-4 py-4">
      {/* {isDekstopView ? <WorkspaceHistory id={undefined} /> : null} */}
      {/* <WorkspaceChatInputs /> */}
      <WorkspaceChatOutput onSubmit={submitHandler} />
    </div>
  );
};

export default Chat;
