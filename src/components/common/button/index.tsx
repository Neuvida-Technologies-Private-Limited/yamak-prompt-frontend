import React, { Ref } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

interface ButtonProps {
  icon?: React.ReactNode;
  name?: string | number;
  className?: string;
  size: 'small' | 'middle' | 'large' | undefined;
  variant: 'primary' | 'secondary' | 'outlined' | 'default' | 'simple';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  htmlType?: 'submit' | undefined;
  ref?: Ref<HTMLElement> | undefined;
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
  ref,
}) => {
  const rootClassName = classNames(
    'flex items-center justify-center font-poppins text-[13px] md:text-sm lg:text-15px !py-5 !px-3',
    {
      'bg-primary text-white hover:!text-white border-none hover:bg-primary700':
        variant === 'primary',
      'bg-secondary text-white hover:!text-white border-none hover:bg-secondary400':
        variant === 'secondary',
      'border-2 !rounded-lg border-black font-medium': variant === 'outlined',
      'whitespace-nowrap bg-gray50 text-primary600 font-bold !rounded-xl border-0':
        variant === 'default',
      'bg-transparent border-0 shadow-none font-bold': variant === 'simple',
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
      ref={ref}
    >
      {name}
    </Button>
  );
};

export default button;
