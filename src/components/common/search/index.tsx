import React from "react";
import { Select } from "antd";

interface OptionsProps {
  value: string;
  label: string;
}

interface SelectProps {
  options: OptionsProps[];
  className?: string;
  placeholder?: string;
}

const handleChange = (value: string) => {
  //   console.log(`selected ${value}`);
};

const select: React.FC<SelectProps> = ({ options, className , placeholder}) => (
  <Select
    placeholder={placeholder}
    className={className}
    style={{ width: 120 }}
    onChange={handleChange}
    options={options}
  />
);

export default select;
