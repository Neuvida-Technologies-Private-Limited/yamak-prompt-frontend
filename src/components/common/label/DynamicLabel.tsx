import { useState } from 'react';
import { Button } from '..';
import { LabelType } from 'types';

interface DynamicLabelProps {
  initialLabels?: LabelType[] | undefined;
  noLabelsMessage?: string;
  className?: string;
}

const DynamicLabel: React.FC<DynamicLabelProps> = ({
  initialLabels = [],
  noLabelsMessage = 'Create labels',
  className,
}) => {
  const [labels, setLabels] = useState(initialLabels);
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    setLabels(prev => [...prev, { id: crypto.randomUUID(), text }]);
    setText('');
    setShowInput(false);
  }

  return (
    <div className={`flex justify-center items-center gap-2 m-4 ${className}`}>
      <div className="flex gap-2">
        {labels.length === 0 ? (
          <p className="text-xs">{noLabelsMessage}</p>
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
            className="bg-gray50 py-2 px-4 outline-none text-xs rounded-xl w-[6rem]"
            placeholder="Enter label"
            value={text}
            onChange={event => setText(event.target.value)}
          />
        )}
      </form>
      <Button
        size="small"
        shape="circle"
        name={showInput ? '-' : '+'}
        onClick={() => setShowInput(prev => !prev)}
        className="bg-primary600 text-white !py-4 !px-3 text-xs border-none"
        type="default"
      />
    </div>
  );
};

export default DynamicLabel;
