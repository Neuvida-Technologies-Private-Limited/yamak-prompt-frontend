import React, { ReactNode } from 'react';
import { Button } from 'antd';

interface ButtonProps {
  icon?: ReactNode;
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
    className={className}
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
