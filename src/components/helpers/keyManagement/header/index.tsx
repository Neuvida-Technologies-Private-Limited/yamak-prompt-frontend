import React from 'react';

interface KeyHeaderProps {
  children: React.ReactNode | any;
}

const KeyHeader: React.FC<KeyHeaderProps> = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

export default KeyHeader;
