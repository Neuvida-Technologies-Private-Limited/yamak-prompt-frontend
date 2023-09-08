import React from 'react';
import { Timeline } from 'antd';

interface Items {
  color?: string;
  dot: React.ReactNode;
  label?: React.ReactNode;
  children: React.ReactNode;
  position?: 'left' | 'right';
}

interface TimelineProps {
  items?: Items[];
  className?: string;
}

const App: React.FC<TimelineProps> = ({ className, items }) => (
  <Timeline mode="left" items={items} className={className} />
);

export default App;
