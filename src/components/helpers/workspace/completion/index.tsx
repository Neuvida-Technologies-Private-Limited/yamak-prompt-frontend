import { useCallback, useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { message } from 'antd';
import { toast, ToastContainer } from 'react-toastify';

import {
  WorkspaceCompletionOutput,
  WorkspaceHistory,
  WorkspaceCompletionInputs,
} from 'components/helpers';
import {
  generateOutputState,
  publishPromptState,
  workspaceHistoryPaginationState,
  workspaceHistoryState,
  workspaceInfoState,
} from 'middleware/state';
import {
  GenerateOutput,
  GetWorkspaceHistory,
  getSearchWorkspaceHistory,
} from 'middleware/api';
import { ITEMS_PER_PAGE } from 'utils/constants';

interface CompletionProps {}

const Completion: React.FC<CompletionProps> = () => {
  const [outputState, setOutputState] = useRecoilState(generateOutputState);
  const [, setPublishState] = useRecoilState(publishPromptState);
  const [{ id }] = useRecoilState(workspaceInfoState);
  const [, setWorkspaceHistoryState] = useRecoilState(workspaceHistoryState);
  const [{ currentPage, query }, setHistoryPagination] = useRecoilState(
    workspaceHistoryPaginationState
  );

  const isDekstopView = window.innerWidth >= 768;

  const {
    system_message,
    user_message,
    title,
    bookmarked,
    is_public,
    prompt_type,
    tags,
    parameters: { temperature, max_tokens },
  } = outputState;

  const getHistory = useCallback(
    async function (currentPage: number) {
      try {
        const res = await GetWorkspaceHistory(id, currentPage);

        setHistoryPagination(old => ({
          ...old,
          count: res.data.count,
          hasNext: res.data.next,
          hasPrevious: res.data.previous,
          totalPages: Math.ceil(res.data.count / ITEMS_PER_PAGE),
        }));

        setWorkspaceHistoryState(old => ({
          ...old,
          history: res.data.results,
        }));
      } catch (error: any) {
        toast.error(error.error);
      }
    },
    [id, setWorkspaceHistoryState, setHistoryPagination]
  );

  const generateOutput = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (system_message === '' || user_message === '' || title === '') {
      message.error('Field/Fields Empty');
      return;
    }

    const outputParams = {
      workspace: id,
      system_message,
      user_message,
      title,
      bookmarked,
      is_public,
      prompt_type,
      tags,
      parameters: {
        temperature: temperature,
        max_tokens: max_tokens,
      },
    };

    try {
      const res = await GenerateOutput(outputParams);
      if (res.status === 201) {
        var msg = String(res.data.prompt_output);
        var hd = String(res.data.title);
        var uuid = String(res.data.uuid);
        var UM = String(res.data.user_message);
        var SM = String(res.data.system_message);
        await getHistory(currentPage);
      } else {
        toast.error('Error in generating Output');
      }
    } catch (error: any) {
      toast.error(error.error);
    }
    setOutputState(old => ({
      ...old,
      output: msg,
    }));
    setPublishState(old => ({
      ...old,
      heading: hd,
      uuid: uuid,
      userMessage: UM,
      systemMessage: SM,
    }));
  };

  const searchHistoryHandler = useCallback(
    async function (input: string) {
      try {
        const res = await getSearchWorkspaceHistory(id, currentPage, input);
        setHistoryPagination(old => ({
          ...old,
          count: res.count,
          hasNext: res.next,
          hasPrevious: res.previous,
          totalPages: Math.ceil(res.count / ITEMS_PER_PAGE),
        }));
        setWorkspaceHistoryState(old => ({
          ...old,
          history: res.results,
        }));
      } catch (err: any) {
        console.log(err);
        message.error('ERRORRRRRRR');
      }
    },
    [setWorkspaceHistoryState, setHistoryPagination, id, currentPage]
  );

  useEffect(() => {
    async function getHistoryOnLoad() {
      try {
        if (query.length === 0) {
          await getHistory(currentPage);
        } else {
          await searchHistoryHandler(query);
        }
      } catch (err: any) {}
    }

    getHistoryOnLoad();
  }, [getHistory, currentPage, searchHistoryHandler, query]);

  return (
    <div className="em:flex em:flex-row h-full sm:grid md:grid-col-2 sm:grid-col-1">
      {isDekstopView ? (
        <div className="lg:w-1/5 pt-4 border-r-4 border-gray50 col-span-1 md:flex sm:hidden h-full">
          <WorkspaceHistory onHistorySearch={searchHistoryHandler} />
        </div>
      ) : null}

      <div className="lg:w-2/6 py-6 px-4 col-span-1 h-full">
        <WorkspaceCompletionInputs />
      </div>
      <div className="lg:w-3/6 pt-6 pl-4 md:col-span-2 h-full">
        <WorkspaceCompletionOutput generateOutput={generateOutput} />
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Completion;
