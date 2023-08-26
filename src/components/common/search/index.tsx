import React from "react";
import { Input } from "antd";

interface SearchProps {
  placeholder: string;
  className?:string
}

const { Search } = Input;

const onSearch = (value: string) => {
};

const App: React.FC<SearchProps> = ({ placeholder, className }) => (
  <Search placeholder={placeholder} allowClear onSearch={onSearch} className={className}/>
);

export default App;
