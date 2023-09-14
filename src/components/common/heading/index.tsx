import React from 'react';

interface Props {
  variant: Variant;
  className?: string;
  children?: React.ReactNode | any;
}

type Variant = 'mainHeading' | 'subHeading';

const Heading: React.FC<Props> = ({ variant, className, children }) => {
  return variant === 'mainHeading' ? (
    <h1
      className={`font-semibold sm:text-2xl md:text-3xl text-gray900 ${className}`}
    >
      {children}
    </h1>
  ) : (
    <h2 className={`font-semibold sm:text-lg md:text-2xl ${className}`}>
      {children}
    </h2>
  );
};

export default Heading;
