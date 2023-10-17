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
  searchHistoryState,
  workspaceHistoryPaginationState,
  workspaceHistoryState,
  workspaceInfoState,
} from 'middleware/state';
import {
  GenerateOutput,
  GetWorkspaceHistory,
  updatePromptInfo,
} from 'middleware/api';
import { useCallback, useEffect } from 'react';
import { ITEMS_PER_PAGE } from 'utils/constants';

interface CompletionProps {
  onHistorySearch: (input: string, id: string) => void;
  onPublishPrompt: (uuid: string, is_public: boolean) => Promise<any>;
}

const Completion: React.FC<CompletionProps> = ({
  onHistorySearch,
  onPublishPrompt,
}) => {
  const [outputState, setOutputState] = useRecoilState(generateOutputState);
  const [, setPublishState] = useRecoilState(publishPromptState);
  const [{ id }] = useRecoilState(workspaceInfoState);
  const [, setWorkspaceHistoryState] = useRecoilState(workspaceHistoryState);
  const [{ currentPage }, setHistoryPagination] = useRecoilState(
    workspaceHistoryPaginationState
  );
  const [searchInput] = useRecoilState(searchHistoryState);

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
    async function (ID: string, currentPage: number) {
      try {
        const res = await GetWorkspaceHistory(ID, currentPage);

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
    [setWorkspaceHistoryState, setHistoryPagination]
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
        await getHistory(id, currentPage);
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
      bookmarked: bookmarked,
    }));
    setPublishState(old => ({
      ...old,
      heading: hd,
      uuid: uuid,
      userMessage: UM,
      systemMessage: SM,
    }));
  };

  const updatePromptHandler = async function (update: any, uuid: string) {
    try {
      const res = await updatePromptInfo(update, uuid);
      getHistory(id, currentPage);
      return res;
    } catch (err: any) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    getHistory(id, currentPage);
  }, [id, getHistory, currentPage]);

  return (
    <div className="em:flex em:flex-row h-full sm:grid md:grid-col-2 sm:grid-col-1">
      {isDekstopView ? (
        <div className="lg:w-1/5 pt-4 border-r-4 border-gray50 col-span-1 md:flex sm:hidden h-full">
          <WorkspaceHistory
            onHistorySearch={onHistorySearch}
            id={id}
            onUpdatePrompt={updatePromptHandler}
            onPublishPrompt={onPublishPrompt}
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
        />
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Completion;
