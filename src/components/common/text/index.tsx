import React, { CSSProperties } from 'react';
import cn from 'classnames';

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
}

type Variant = 'body' | 'medium' | 'small';

const Text: React.FC<Props> = ({
  style,
  className,
  variant = 'body',
  children,
}) => {
  return (
    <p
      className={cn(
        'text-gray900 text-sm leading-4',
        {
          'lg:leading-[27px] lg:text-15px': variant === 'body', // default body text
          'lg:text-15px xl:text-base': variant === 'medium',
          'text-xs lg:leading-[1.85em]': variant === 'small',
        },
        className
      )}
      style={style}
    >
      {children}
    </p>
  );
};

export default Text;
