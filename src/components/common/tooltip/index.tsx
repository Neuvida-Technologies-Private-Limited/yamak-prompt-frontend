import React, { ReactNode } from 'react';
import { Tooltip } from 'antd';

interface TooltipProps {
  element: ReactNode | string;
  title: string;
}

const App: React.FC<TooltipProps> = ({ element, title }) => (
  <Tooltip title={title}>
    <span>{element}</span>
  </Tooltip>
);

export default App;
