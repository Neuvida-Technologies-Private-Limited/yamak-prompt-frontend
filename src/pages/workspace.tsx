import { CreateWorkspace } from 'components/helpers';
import React from 'react';
import { Workspace } from 'utils/constants';

const workspace: React.FC = () => {
  return (
    <div className="flex p-6 justify-between">
      <div className="flex flex-col font-poppins">
        <h1 className="text-bold text-2xl text-black">
          {Workspace.Workspaces}
        </h1>
        <h4 className="text-sm text-gray400">{Workspace.Subhead1}</h4>
        <h4 className="text-sm text-gray400">{Workspace.Subhead2}</h4>
      </div>
      <CreateWorkspace />
    </div>
  );
};

export default workspace;
