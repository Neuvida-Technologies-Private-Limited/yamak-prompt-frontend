import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<Props> = ({ children, className }) => {
  return <p className={`text-justify ${className}`}>{children}</p>;
};

export default Text;
