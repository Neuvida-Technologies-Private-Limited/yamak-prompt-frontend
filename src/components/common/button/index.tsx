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
  onClick: () => void;
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
}) => (
  <Button
    className={`flex items-center gap-x-0 font-poppins ${className}`}
    icon={icon}
    size={size}
    type={type}
    shape={shape}
    href={href}
    onClick={onClick}
  >
    {name}
  </Button>
);

export default button;
