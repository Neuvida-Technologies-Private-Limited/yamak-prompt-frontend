import React from 'react';
import { Tag } from 'antd';

interface TagProps {
  label: string;
  color: string;
  className: string;
}

const tag: React.FC<TagProps> = ({ label, color, className }) => {
  return (
    <Tag color={color} className={className}>
      {label}
    </Tag>
  );
};

export default tag;
