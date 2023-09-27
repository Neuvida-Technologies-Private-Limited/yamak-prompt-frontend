import React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;

interface Props {
  level: 1 | 2 | 3 | 4 | 5;
  className?: string;
  children?: React.ReactNode | any;
}

const Heading: React.FC<Props> = ({ level, className, children }) => {
  return (
    <Title
      level={level}
      className={`font-poppins !font-semibold !text-gray900  ${className}`}
    >
      {children}
    </Title>
  );
};

export default Heading;
