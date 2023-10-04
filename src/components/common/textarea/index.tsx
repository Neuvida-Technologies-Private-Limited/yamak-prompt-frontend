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
  onChange: (value: string) => void;
  disabled?: boolean;
  value?: string;
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
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextArea
      id={id}
      name={name}
      rows={rows}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`border-0 !focus:outline-none !resize-none ${className}`}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default index;
