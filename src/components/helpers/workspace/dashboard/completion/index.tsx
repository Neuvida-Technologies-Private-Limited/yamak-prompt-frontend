import { useCallback, useEffect } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';
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
  variablesRowNumberState,
  variablesRowState,
  workspaceHistoryPaginationState,
  workspaceHistoryState,
  workspaceInfoState,
} from 'middleware/state';
import {
  GenerateOutput,
  GetWorkspaceHistory,
  deletePrompt,
  getSearchWorkspaceHistory,
  updatePromptInfo,
} from 'middleware/api';
import { ITEMS_PER_PAGE } from 'utils/constants';

interface CompletionProps {}

const Completion: React.FC<CompletionProps> = ({}) => {
  const [outputState, setOutputState] = useRecoilState(generateOutputState);
  const [{ model_key }] = useRecoilState(workspaceInfoState);
  const [, setPublishState] = useRecoilState(publishPromptState);
  const [{ id }] = useRecoilState(workspaceInfoState);
  const [{ history }, setWorkspaceHistoryState] = useRecoilState(
    workspaceHistoryState
  );
  const [{ currentPage, query }, setHistoryPagination] = useRecoilState(
    workspaceHistoryPaginationState
  );
  const resetOutputState = useResetRecoilState(generateOutputState);
  const resetPublishState = useResetRecoilState(publishPromptState);
  const resetVariablesRowState = useResetRecoilState(variablesRowState);
  const resetVariableRowNumberState = useResetRecoilState(
    variablesRowNumberState
  );

  const isDekstopView = window.innerWidth >= 768;

  const {
    system_message,
    user_message,
    title,
    bookmarked,
    is_public,
    prompt_type,
    uuid,
    tags,
    parameters: { temperature, max_tokens },
    variables,
  } = outputState;

  const getHistory = useCallback(
    async function (currentPage: number) {
      try {
        const res = await GetWorkspaceHistory(id, currentPage, 'completion');

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

    if (model_key === null) {
      message.warning('Key is absent, please add a key!');
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
      variables: variables,
    };

    setOutputState(old => ({ ...old, isLoading: true }));

    try {
      const res = await GenerateOutput(outputParams);
      if (res.status === 201) {
        var msg = res.data.prompt_output;
        var hd = String(res.data.title);
        var uuid = String(res.data.uuid);
        var UM = String(res.data.user_message);
        var SM = String(res.data.system_message);
        var BM = res.data.bookmarked;
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
      uuid: uuid,
      bookmarked: BM,
      isLoading: false,
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
        if (history.length === 0) return;

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
      } catch (err: any) {}
    },
    [
      setWorkspaceHistoryState,
      setHistoryPagination,
      id,
      currentPage,
      history.length,
    ]
  );

  const updatePromptHandler = async function (update: any, uuid: string) {
    try {
      const res = await updatePromptInfo(update, uuid);
      getHistory(currentPage);
      return res;
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const deleteHistoryPrompt = async (id: string) => {
    try {
      await deletePrompt(id);
      await getHistory(currentPage);
      if (id === uuid) {
        resetOutputState();
        resetPublishState();
        resetVariablesRowState();
        resetVariableRowNumberState();
      }
      return;
    } catch (error) {}
  };

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
          <WorkspaceHistory
            onHistorySearch={searchHistoryHandler}
            onUpdatePrompt={updatePromptHandler}
            getHistory={getHistory}
            currentPage={currentPage}
            deleteHistory={deleteHistoryPrompt}
          />
        </div>
      ) : null}

      <div className="lg:w-2/6 py-6 px-4 col-span-1 h-full">
        <WorkspaceCompletionInputs />
      </div>
      <div className="lg:w-3/6 pt-6 pl-4 md:col-span-2 h-full">
        <WorkspaceCompletionOutput
          generateOutput={generateOutput}
          onUpdatePrompt={updatePromptHandler}
          bookmarked={bookmarked}
          getHistory={getHistory}
          currentPage={currentPage}
        />
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Completion;
