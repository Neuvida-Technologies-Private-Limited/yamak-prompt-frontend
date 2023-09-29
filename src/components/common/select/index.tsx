import React, { ReactNode } from 'react';
import { Select } from 'antd';
import { FiChevronDown } from 'react-icons/fi';
import { SizeType } from 'antd/es/config-provider/SizeContext';

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
  style?: {};
  size?: SizeType;
  onChange?: (value: string) => void;
}

const handleChange = (value: string) => {};

const select: React.FC<SelectProps> = ({
  options,
  className,
  placeholder,
  value,
  onChange,
  id,
  style,
  size = 'middle',
}) => (
  <Select
    id={id}
    value={value}
    style={style}
    placeholder={placeholder}
    className={`${className}`}
    size={size}
    onChange={onChange}
    options={options}
    suffixIcon={<FiChevronDown />}
  />
);

export default select;
