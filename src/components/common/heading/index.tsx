import React from 'react';

interface Props {
  variant: Variant;
  className?: string;
  children?: React.ReactNode | any;
}

type Variant = 'mainHeading' | 'subHeading';

const Heading: React.FC<Props> = ({ variant, className, children }) => {
  // const componentMap: { [P in Variant]: React.ComponentType<any> | string } = {
  //   mainHeading: 'h1',
  //   subHeading: 'h2',
  // };

  return variant === 'mainHeading' ? (
    <h1 className={`font-bold sm:text-xl md:text-3xl ${className}`}>
      {children}
    </h1>
  ) : (
    <h2 className={`font-bold sm:text-lg md:text-2xl ${className}`}>
      {children}
    </h2>
  );
};

export default Heading;
