import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<Props> = ({ children, className }) => {
  return (
    <p
      className={`text-sm md:text-base text-black opacity-40 sm:w-full md:w-3/4 text-justify ${className}`}
    >
      {children}
    </p>
  );
};

export default Text;
