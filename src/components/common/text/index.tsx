import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { TextVariants } from 'utils/constants';

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
}

type Variant = TextVariants.LARGE | TextVariants.MEDIUM | TextVariants.SMALL;

const Text: React.FC<Props> = ({
  style,
  className,
  variant = 'body',
  children,
}) => {
  return (
    <p
      className={classNames(
        'text-gray800 text-sm leading-6 font-poppins',
        {
          'lg:leading-[27px] text-18px lg:text-20px':
            variant === TextVariants.LARGE,
          'text-sm md:text-base font-normal': variant === TextVariants.MEDIUM,
          'text-xs lg:leading-[1.85em]': variant === TextVariants.SMALL,
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
