import { useCallback, useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { message } from 'antd';

import { WorkspaceChatOutput } from 'components/helpers';
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
  const [{ currentPage }, setChatOutputs] =
    useRecoilState(workspaceChatOutputs);
  const [{ id }] = useRecoilState(workspaceInfoState);

  const {
    title,
    user_message,
    is_public,
    bookmarked,
    prompt_type,
    tags,
    parameters,
  } = chatOutputState;

  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();
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
        variables: {},
      };

      if (!title || !user_message) {
        message.error('Title or user message is empty');
        return;
      }

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
      const formattedTags = res.data.tags.map((tag: any) => tag).join(', ');

      setChatOutputState(old => ({
        ...old,
        user_message: '',
        tags: formattedTags,
      }));
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
        const tagsArray = res.data.results.map((result: any) => result.tags);
        const allTags = tagsArray.flat().join(', ');

        setChatOutputState(old => ({
          ...old,
          tags: allTags,
        }));
      } catch (error: any) {}
    },
    [id, setChatOutputs]
  );

  useEffect(() => {
    getChatHistory(currentPage);
  }, [getChatHistory, currentPage]);

  return <WorkspaceChatOutput onSubmit={submitHandler} />;
};

export default Chat;
