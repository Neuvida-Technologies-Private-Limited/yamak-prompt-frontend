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
  const errorClassName = error ? 'border-red-500 focus:ring-red-500' : '';

  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`transition-all block rounded-lg text-gray800 placeholder:text-800 outline-gray500 sm:text-sm sm:leading-6 focus:outline-gray100 font-poppins ${className} ${errorClassName} `}
        value={value}
        onChange={handleChange}
      />
      {/* <div>
        <label className="font-poppins text-xs text-red-500 font-semibold transition-all translate-y-1.5">
          {error}
        </label>
      </div> */}
    </>
  );
};

export default input;
