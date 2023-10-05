import { HiPlus } from 'react-icons/hi';
import { useRecoilState } from 'recoil';

import { Button, TextArea } from 'components/common';
import { ButtonVariants, TextAreaVariants, Workspace } from 'utils/constants';
import { generateOutputState } from 'middleware/state';

interface CompletionInputsProps {}

const CompletionInputs: React.FC<CompletionInputsProps> = () => {
  const [outputState, setOutputState] = useRecoilState(generateOutputState);

  const { system_message, user_message } = outputState;

  const handleSystemMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const SystemMessage = event.target.value;

    setOutputState(old => ({
      ...old,
      system_message: SystemMessage,
    }));
  };
  const handleUserMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const UserMessage = event.target.value;
    setOutputState(old => ({
      ...old,
      user_message: UserMessage,
    }));
  };

  const WorkspaceCompletionInputs = [
    {
      id: '1',
      label: 'System',
      placeholder: 'You are helpful assistance',
      onChange: handleSystemMessageChange,
      value: system_message,
    },
    {
      id: '2',
      label: 'User',
      placeholder:
        'Classify the following {{text 1}} into one of the following: Positive sentiment Negative sentiment Neutral sentiment Text: """ {{ text 2}} """',
      onChange: handleUserMessageChange,
      value: user_message,
    },
  ];

  return (
    <div className="flex flex-col items-start gap-4">
      {WorkspaceCompletionInputs.map((item, index) => (
        <div
          key={`input-section-item-${index}`}
          className="flex flex-col font-poppins border rounded-lg p-4 w-full"
        >
          <label className="font-semibold pb-2">{item.label}</label>
          <TextArea
            id={item.id}
            name={item.placeholder}
            rows={5}
            placeholder={item.placeholder}
            maxLength={0}
            variant={TextAreaVariants.DEFAULT}
            value={item.value}
            onChange={item.onChange}
          />
        </div>
      ))}
      <Button
        size="small"
        name={Workspace.AddVariable}
        icon={<HiPlus />}
        onClick={() => {}}
        variant={ButtonVariants.OUTLINED}
      />
    </div>
  );
};

export default CompletionInputs;
