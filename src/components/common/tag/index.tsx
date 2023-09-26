import React from 'react';
import { Tag } from 'antd';

interface TagProps {
  label: string;
  color: string;
  className?: string;
  bordered?: boolean;
}

const tag: React.FC<TagProps> = ({ label, color, bordered, className }) => {
  return (
    <Tag
      color={color}
      className={`font-poppins inline-block self-start rounded-lg mb-4 p-1 px-2 text-xs text-gray800 ${className}`}
      bordered={bordered}
    >
      {label}
    </Tag>
  );
};

export default tag;
