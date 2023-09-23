import React from 'react';
import { Button } from 'antd';

interface ButtonProps {
  icon?: React.ReactNode;
  name?: string;
  className?: string;
  size: 'small' | 'middle' | 'large' | undefined;
  type: 'link' | 'text' | 'default' | 'primary' | 'dashed';
  shape: 'default' | 'circle' | 'round' | undefined;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  htmlType?: 'submit' | undefined;
}

const button: React.FC<ButtonProps> = ({
  icon,
  name,
  className,
  size,
  type,
  shape,
  href,
  onClick,
  htmlType,
}) => (
  <Button
    className={`flex items-center font-poppins ${className}`}
    icon={icon}
    size={size}
    type={type}
    shape={shape}
    href={href}
    onClick={onClick}
    htmlType={htmlType}
  >
    {name}
  </Button>
);

export default button;
