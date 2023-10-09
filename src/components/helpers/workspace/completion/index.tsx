import { useRecoilState } from 'recoil';
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
} from 'middleware/state';
import { GenerateOutput, GetWorkspaceHistory } from 'middleware/api';
import { useEffect } from 'react';

interface CompletionProps {
  id: string;
  onHistorySearch: (input: string, id: string) => void;
}

const Completion: React.FC<CompletionProps> = ({ id, onHistorySearch }) => {
  const isDekstopView = window.innerWidth >= 768;
  const [outputState, setOutputState] = useRecoilState(generateOutputState);
  const [publishState, setPublishState] = useRecoilState(publishPromptState);
  const [workspaceHistory, setWorkspaceHistory] = useRecoilState(
    workspaceHistoryState
  );
  const [searchInput] = useRecoilState(searchHistoryState);

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

  async function getHistory() {
    if (id) {
      try {
        const res = await GetWorkspaceHistory(id);
        setWorkspaceHistory(old => ({
          ...old,
          history: Array.isArray(res.data) ? res.data : [],
        }));
      } catch (error: any) {
        toast.error(error.error);
      }
    }
  }

  const generateOutput = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

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
        getHistory();
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
    const getData = async () => {
      await getHistory();
    };
    getData();
  }, [workspaceHistory, getHistory, id]);

  return (
    <div className="em:flex em:flex-row h-full sm:grid md:grid-col-2 sm:grid-col-1">
      {isDekstopView ? (
        <div className="lg:w-1/5 pt-4 pr-4 border-r-4 border-gray50 col-span-1 md:flex sm:hidden">
          <WorkspaceHistory
            onHistorySearch={onHistorySearch}
            id={id}
            getHistory={getHistory}
          />
        </div>
      ) : null}

      <div className="lg:w-2/6 py-6 px-4 col-span-1">
        <WorkspaceCompletionInputs />
      </div>
      <div className="lg:w-3/6 pt-6 pl-4 md:col-span-2">
        <WorkspaceCompletionOutput generateOutput={generateOutput} />
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Completion;
