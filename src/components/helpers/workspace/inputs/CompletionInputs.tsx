import { useRecoilState } from 'recoil';

import { Button, TextArea } from 'components/common';
import { ButtonVariants, TextAreaVariants, Workspace } from 'utils/constants';
import { generateOutputState } from 'middleware/state';
import { AddVariables } from 'components/helpers';
import { useState } from 'react';

interface CompletionInputsProps {}

const CompletionInputs: React.FC<CompletionInputsProps> = () => {
  const [outputState, setOutputState] = useRecoilState(generateOutputState);
  const [userInput, setUserInput] = useState('');

  const { system_message, user_message } = outputState;

  const [variables, setVariables] = useState({});

  // Function to handle variable additions and updates
  const handleVariableUpdate = (
    variableName: string,
    variableValue: string
  ) => {
    setVariables({ ...variables, [variableName]: variableValue });
  };

  const replaceVariablePlaceholders = (message: string, variables: any) => {
    return message.replace(/{{(.*?)}}/g, (match, variableName) => {
      return variables[variableName] || match;
    });
  };

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
    setUserInput(UserMessage);
    const userMessageWithVariables = replaceVariablePlaceholders(
      UserMessage,
      variables
    );
    setOutputState(old => ({
      ...old,
      user_message: userMessageWithVariables,
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
      value: userInput,
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
      <AddVariables onAddVariable={handleVariableUpdate} />
    </div>
  );
};

export default CompletionInputs;
