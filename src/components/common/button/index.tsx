import React from 'react';
import cn from 'classnames';
import { Button } from 'antd';

interface ButtonProps {
  icon?: React.ReactNode;
  name?: string;
  className?: string;
  size: 'small' | 'middle' | 'large' | undefined;
  variant: 'primary' | 'secondary' | 'outlined' | 'default';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  htmlType?: 'submit' | undefined;
}

const button: React.FC<ButtonProps> = ({
  icon,
  name,
  className,
  size,
  variant = 'primary',
  href,
  onClick,
  htmlType,
}) => {
  const rootClassName = cn(
    'flex items-center justify-center font-poppins text-[13px] md:text-sm lg:text-15px !py-5 !px-3',
    {
      'bg-primary text-white hover:!text-white border-none hover:bg-primary700':
        variant === 'primary',
      'bg-secondary text-white hover:!text-white border-none hover:bg-secondary400':
        variant === 'secondary',
      'border-2 !rounded-lg border-black font-medium !py-5 !px-4 !text-base':
        variant === 'outlined',
      'whitespace-nowrap bg-gray50 text-primary600 font-bold !rounded-xl border-0':
        variant === 'default',
    },
    className
  );

  return (
    <Button
      className={rootClassName}
      icon={icon}
      size={size}
      href={href}
      onClick={onClick}
      htmlType={htmlType}
    >
      {name}
    </Button>
  );
};

export default button;
