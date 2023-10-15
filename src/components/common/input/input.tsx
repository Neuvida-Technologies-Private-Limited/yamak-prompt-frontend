import React from 'react';
import classNames from 'classnames';

type Variant = 'filled' | 'outlined' | 'default';

interface InputProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  onChange: (value: string) => void;
  value?: string | number;
  error?: string;
  variant: Variant;
  disabled?: boolean;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  placeholder,
  required,
  className,
  onChange,
  value,
  variant,
  error,
  disabled,
  maxLength,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const rootClassName = classNames(
    'transition-all block rounded-lg focus:outline-0 sm:text-sm sm:leading-6 mb-1 font-poppins text-black placeholder:text-gray200',
    {
      'w-full bg-gray50 p-2 px-3': variant === 'filled',
      'border-2 border-gray400': variant === 'outlined',
    },
    className
  );

  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={rootClassName}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        maxLength={maxLength}
      />
      <label className="font-poppins text-xs text-error font-semibold transition-all">
        {error}
      </label>
    </>
  );
};

export default Input;
