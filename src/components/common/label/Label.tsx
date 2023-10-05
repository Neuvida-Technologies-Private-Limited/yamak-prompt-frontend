import { useState } from 'react';
import { Button } from '..';
import { LabelType } from 'types';
import { ButtonVariants, Label as LabelConst } from 'utils/constants';

interface LabelProps {
  initialLabels?: LabelType[] | undefined;
  noLabelsMessage?: string;
  className?: string;
  onChange?: (labels: string[]) => void;
}

const Label: React.FC<LabelProps> = ({
  initialLabels = [],
  noLabelsMessage = LabelConst.NO_LABELS_MESSAGE,
  className,
  onChange,
}) => {
  const [labels, setLabels] = useState(initialLabels);
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    const newLabel = { id: crypto.randomUUID(), text };
    setLabels(prev => [...prev, newLabel]);
    setText('');
    setShowInput(false);

    if (onChange) {
      const newTexts = labels.map(label => label.text);
      onChange([...newTexts, newLabel.text]);
    }
  }

  return (
    <div
      className={`flex justify-center font-poppins items-center gap-2 mx-4 ${className}`}
    >
      <div className="flex gap-2">
        {labels.length === 0 ? (
          <p className="text-xs font-medium text-secondary">
            {noLabelsMessage}
          </p>
        ) : (
          labels.map(label => (
            <button
              key={label.id}
              className="border border-primary900 text-primary600 rounded-3xl p-2 text-xs"
            >
              {label.text}
            </button>
          ))
        )}
      </div>
      <form onSubmit={submitHandler}>
        {showInput && (
          <input
            type="text"
            className="bg-gray50 p-2 outline-none text-xs rounded-xl w-[6rem]"
            placeholder="Enter label"
            value={text}
            onChange={event => setText(event.target.value)}
          />
        )}
      </form>
      <Button
        size="small"
        variant={ButtonVariants.PRIMARY}
        name={showInput ? '-' : '+'}
        onClick={() => setShowInput(prev => !prev)}
      />
    </div>
  );
};

export default Label;
