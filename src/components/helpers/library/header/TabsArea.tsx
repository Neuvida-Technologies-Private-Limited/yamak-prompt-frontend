import React from 'react';

interface TabsAreaProps {
  children: React.ReactNode | any;
}

const TabsArea: React.FC<TabsAreaProps> = ({ children }) => {
  return (
    <div className="flex py-6 px-6 border-b-2 border-gray50">{children}</div>
  );
};

export default TabsArea;
