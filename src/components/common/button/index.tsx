import React from 'react';
import cn from 'classnames';
import { Button } from 'antd';

interface ButtonProps {
  icon?: React.ReactNode;
  name?: string;
  className?: string;
  size: 'small' | 'middle' | 'large' | undefined;
  variant:
    | 'primary'
    | 'primary-light'
    | 'secondary'
    | 'outlined'
    | 'outlined-light'
    | 'link'
    | 'default';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  htmlType?: 'submit' | undefined;
  type?: 'link' | 'primary' | 'text' | 'default' | undefined;
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
  type,
}) => {
  const rootClassName = cn(
    'flex items-center justify-center font-poppins text-xs md:text-sm ',
    {
      'bg-primary text-white hover:!text-white border-none hover:bg-primary700 !py-5 !px-4 !rounded-xl':
        variant === 'primary',
      'bg-primary50 text-primary800 border-none !py-5 !px-4 !rounded-xl':
        variant === 'primary-light',
      'bg-secondary text-white hover:!text-white border-none hover:bg-secondary400 !rounded-xl':
        variant === 'secondary',
      'border-2 !rounded-xl border-black !py-5 font-medium':
        variant === 'outlined',
      'border-1 border-gray200 !py-2 text-xs': variant === 'outlined-light',
      '!border-0 underline decoration-primary hover:!text-primary800 !py-5 !rounded-xl text-primary decoration-solid decoration-1 hover:!bg-primary50':
        variant === 'link',
      'whitespace-nowrap bg-gray50 text-primary600 font-bold !rounded-xl border-0 !py-4':
        variant === 'default',
    },
    className
  );

  return (
    <Button
      className={`${rootClassName} ${className}`}
      type={type}
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
