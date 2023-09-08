import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

interface TextAreaProps {
  rows: number;
  placeholder: string;
  maxLength: number;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const index: React.FC<TextAreaProps> = ({
  rows,
  placeholder,
  maxLength,
  className,
  onChange,
}) => {
  return (
    <TextArea
      rows={rows}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`border-0 ${className}`}
      onChange={onChange}
    />
  );
};

export default index;
