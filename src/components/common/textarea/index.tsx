import React from 'react';
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
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
  value?: string;
  variant: 'default' | 'filled';
  error?: string;
}

const index: React.FC<TextAreaProps> = ({
  id,
  name,
  rows,
  placeholder,
  maxLength,
  className,
  onChange,
  disabled,
  value,
  variant,
  error,
}) => {
  const rootClassnames = classNames(
    'border-0 !focus:outline-none !resize-none',
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
        onChange={onChange}
        disabled={disabled}
      />
      <div>
        <label className="font-poppins text-xs text-error font-semibold transition-all">
          {error}
        </label>
      </div>
    </>
  );
};

export default index;
