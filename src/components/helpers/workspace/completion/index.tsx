import { useRecoilState } from 'recoil';

import {
  WorkspaceCompletionOutput,
  WorkspaceHistory,
  WorkspaceCompletionInputs,
} from 'components/helpers';
import { generateOutputState } from 'middleware/state';
import { GenerateOutput } from 'middleware/api';

interface CompletionProps {
  id: string;
}

const Completion: React.FC<CompletionProps> = ({ id }) => {
  const isDekstopView = window.innerWidth >= 768;
  const [outputState, setOutputState] = useRecoilState(generateOutputState);

  const {
    workspace,
    system_message,
    user_message,
    title,
    bookmarked,
    is_public,
    prompt_type,
    output,
    parameters: {
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty,
      logit_bias,
    },
  } = outputState;

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
      // parameters: {
      //   temperature,
      //   max_tokens,
      //   top_p,
      //   frequency_penalty,
      //   presence_penalty,
      //   logit_bias,
      // },
    };

    try {
      const res = await GenerateOutput(outputParams);
      var message = res.message;
    } catch (error: any) {
      console.log(error);
    }

    setOutputState(old => ({
      ...old,
      output: message,
    }));
  };

  return (
    <>
      {isDekstopView ? (
        <div className="lg:w-1/5 pt-4 pr-4 border-r-4 border-gray50 col-span-1 md:flex sm:hidden">
          <WorkspaceHistory />
        </div>
      ) : null}

      <div className="lg:w-2/6 py-6 px-4 col-span-1">
        <WorkspaceCompletionInputs />
      </div>
      <div className="lg:w-3/6 pt-6 pl-4 md:col-span-2">
        <WorkspaceCompletionOutput generateOutput={generateOutput} />
      </div>
    </>
  );
};

export default Completion;
