import React, { ReactNode } from 'react';
import { Select } from 'antd';
import { FiChevronDown } from 'react-icons/fi';

interface OptionsItems {
  value: string;
  label: string;
}

interface SelectProps {
  options: OptionsItems[];
  className?: string;
  placeholder?: ReactNode;
  value?: string;
  id?: string;
}

const handleChange = (value: string) => {};

const select: React.FC<SelectProps> = ({
  options,
  className,
  placeholder,
  value,
  id,
}) => (
  <Select
    id={id}
    value={value}
    placeholder={placeholder}
    className={className}
    onChange={handleChange}
    options={options}
    suffixIcon={<FiChevronDown />}
  />
);

export default select;
