import React, { ReactNode } from 'react';
import { Tooltip } from 'antd';

interface TooltipProps {
  element: ReactNode | string;
  title: string;
  color?: string;
  className?: string;
}

const App: React.FC<TooltipProps> = ({ element, title, color, className }) => (
  <Tooltip
    title={title}
    color={color}
    // overlayInnerStyle={{ color: 'black' }}
    overlayClassName="font-poppins"
  >
    <span>{element}</span>
  </Tooltip>
);

export default App;
