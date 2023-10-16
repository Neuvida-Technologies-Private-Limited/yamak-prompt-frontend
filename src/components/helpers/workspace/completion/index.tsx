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
  workspaceHistoryState,
  workspaceInfoState,
} from 'middleware/state';
import { GenerateOutput, GetWorkspaceHistory } from 'middleware/api';
import { useCallback, useEffect } from 'react';

interface CompletionProps {
  onHistorySearch: (input: string, id: string) => void;
}

const Completion: React.FC<CompletionProps> = ({ onHistorySearch }) => {
  const isDekstopView = window.innerWidth >= 768;
  const [outputState, setOutputState] = useRecoilState(generateOutputState);
  const [publishState, setPublishState] = useRecoilState(publishPromptState);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceInfoState);

  const [workspaceHistory, setWorkspaceHistoryState] = useRecoilState(
    workspaceHistoryState
  );
  const [searchInput] = useRecoilState(searchHistoryState);
  const { id } = workspaceData;

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
    async function (ID: string) {
      try {
        const res = await GetWorkspaceHistory(ID);
        setWorkspaceHistoryState(old => ({
          ...old,
          history: Array.isArray(res.data) ? res.data : [],
        }));
      } catch (error: any) {
        toast.error(error.error);
      }
    },
    [setWorkspaceHistoryState]
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
        await getHistory(id);
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

  useEffect(() => {
    getHistory(id);
  }, [id]);

  return (
    <div className="em:flex em:flex-row h-full sm:grid md:grid-col-2 sm:grid-col-1">
      {isDekstopView ? (
        <div className="lg:w-1/5 pt-4 border-r-4 border-gray50 col-span-1 md:flex sm:hidden h-full">
          <WorkspaceHistory onHistorySearch={onHistorySearch} id={id} />
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
