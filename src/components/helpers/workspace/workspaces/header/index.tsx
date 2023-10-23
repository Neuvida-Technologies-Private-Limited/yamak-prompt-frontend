import React from 'react';

interface WorkspaceHeaderProps {
  children: React.ReactNode | any;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ children }) => {
  return <div className="flex flex-col shadow">{children}</div>;
};

export default WorkspaceHeader;
