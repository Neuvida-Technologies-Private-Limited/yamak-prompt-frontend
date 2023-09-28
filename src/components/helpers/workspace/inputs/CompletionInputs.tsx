import { Button, TextArea } from 'components/common';
import { WorkspaceCompletionInputs } from 'utils/constants';
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
            className="!resize-none !h-full focus:border-gray50 hover:border-0"
            onChange={() => {}}
          />
        </div>
      ))}
      <Button
        size="small"
        name={'Add Variable'}
        icon={<HiPlus />}
        onClick={() => {}}
        variant="outlined"
      />
    </div>
  );
};

export default CompletionInputs;
