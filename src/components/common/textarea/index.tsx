import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

interface TextAreaProps {
  id: string;
  name: string;
  rows: number;
  placeholder: string;
  maxLength?: number;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
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
}) => {
  return (
    <TextArea
      id={id}
      name={name}
      rows={rows}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`border-0 !focus:outline-none !resize-none ${className}`}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default index;
