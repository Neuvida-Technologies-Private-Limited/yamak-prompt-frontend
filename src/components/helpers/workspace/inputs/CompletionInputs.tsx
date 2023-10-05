import { Button, TextArea } from 'components/common';
import {
  ButtonVariants,
  TextAreaVariants,
  Workspace,
  WorkspaceCompletionInputs,
} from 'utils/constants';
import { HiPlus } from 'react-icons/hi';

const CompletionInputs = () => {
  return (
    <div className="flex flex-col items-start gap-4 h-full">
      {WorkspaceCompletionInputs.map((item, index) => (
        <div
          key={`input-section-item-${index}`}
          className="flex flex-col font-poppins border rounded-lg p-4 h-full w-full"
        >
          <label className="font-semibold pb-2">{item.label}</label>
          <TextArea
            id={item.id}
            name={item.placeholder}
            rows={10}
            placeholder={item.placeholder}
            maxLength={0}
            variant={TextAreaVariants.DEFAULT}
            onChange={() => {}}
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
