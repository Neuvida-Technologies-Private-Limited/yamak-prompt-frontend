import React from 'react';

type Variant = 'filled' | 'outlined' | 'default';

interface InputProps {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  onChange: (value: string) => void;
  value?: string;
  error?: string;
  variant: Variant;
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
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  const errorClassName = error ? 'border-error focus:ring-error' : 'mb-4';

  return variant === 'filled' ? (
    <>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`${className} ${errorClassName} transition-all block rounded-lg w-full  text-black placeholder:text-gray200 bg-gray50 p-2 px-3 sm:text-sm sm:leading-6 font-poppins`}
        value={value}
        onChange={handleChange}
      />
      <div>
        <label className="font-poppins text-xs text-error font-semibold transition-all">
          {error}
        </label>
      </div>
    </>
  ) : variant === 'outlined' ? (
    <>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`${className} ${errorClassName} transition-all block rounded-lg text-black placeholder:text-gray200 border-2 border-gray400 sm:text-sm sm:leading-6 font-poppins`}
        value={value}
        onChange={handleChange}
      />
      <div>
        <label className="font-poppins text-xs text-error font-semibold transition-all">
          {error}
        </label>
      </div>
    </>
  ) : variant === 'default' ? (
    <>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`${className} ${errorClassName} transition-all block rounded-lg text-black placeholder:text-gray200 sm:text-sm sm:leading-6 font-poppins focus:outline-0`}
        value={value}
        onChange={handleChange}
      />
      <div>
        <label className="font-poppins text-xs text-error font-semibold transition-all">
          {error}
        </label>
      </div>
    </>
  ) : null;
};

export default Input;
