import React, { useState } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import { TextAreaVariants } from 'utils/constants';

const { TextArea } = Input;

interface TextAreaProps {
  id: string;
  name: string;
  rows: number;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  value?: string;
  variant: 'default' | 'filled';
  error?: string;
}

const Index: React.FC<TextAreaProps> = ({
  id,
  name,
  rows,
  placeholder,
  maxLength = Infinity,
  className,
  onChange,
  disabled,
  value,
  variant,
  error,
}) => {
  const [text, setText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxLength) {
      onChange?.(event);
      setText(inputValue);
    }
  };

  const rootClassnames = classNames(
    '!border-0 !focus:outline-none !resize-none !focus:border-0',
    {
      'p-3 w-full bg-gray50 mb-1': variant === TextAreaVariants.FILLED,
      'bg-white': variant === TextAreaVariants.DEFAULT,
    },
    className
  );

  return (
    <>
      <TextArea
        id={id}
        value={value}
        name={name}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        className={rootClassnames}
        onChange={handleInputChange}
        disabled={disabled}
      />
      <div className="flex justify-between">
        <label className="font-poppins text-xs text-error font-semibold transition-all">
          {error}
        </label>
        <label className="font-poppins text-gray300 text-xs">
          {maxLength - text.length}
        </label>
      </div>
    </>
  );
};

export default Index;
