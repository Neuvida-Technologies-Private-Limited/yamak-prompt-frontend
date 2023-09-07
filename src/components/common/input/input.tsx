import React from 'react';

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
}

const input: React.FC<InputProps> = ({
  id,
  name,
  type,
  placeholder,
  required,
  className,
  onChange,
  value,
  error,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  const errorClassName = error ? 'border-error focus:ring-error' : '';

  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`${className} ${errorClassName} transition-all block rounded-lg text-black placeholder:text-gray200 sm:text-sm sm:leading-6 font-poppins`}
        value={value}
        onChange={handleChange}
      />
      <div>
        <label className="font-poppins text-xs text-error font-semibold transition-all translate-y-1.5">
          {error}
        </label>
      </div>
    </>
  );
};

export default input;
