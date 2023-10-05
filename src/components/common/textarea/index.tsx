import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import { TextAreaVariants } from 'utils/constants';

const { TextArea } = Input;

interface TextAreaProps {
  id: string;
  name: string;
  rows: number;
  placeholder: string;
  maxLength?: number;
  className?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  value?: string;
  variant: TextAreaVariants.FILLED | TextAreaVariants.DEFAULT;
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
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const rootClassnames = classNames(
    'border-0 !focus:outline-none !resize-none',
    {
      'p-3 w-full bg-gray50 mb-4': variant === TextAreaVariants.FILLED,
      'bg-white': variant === TextAreaVariants.DEFAULT,
    },
    className
  );

  return (
    <TextArea
      id={id}
      name={name}
      rows={rows}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      className={rootClassnames}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default index;
