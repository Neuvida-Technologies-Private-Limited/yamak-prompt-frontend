import React from 'react';
import { Link } from 'react-router-dom';
import { CreateWorkspace, WorkspaceCard } from 'components/helpers';
import { Workspace, workspaces } from 'utils/contants';

const WorkspaceDashboard: React.FC = () => {
  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between pb-6">
        <div className="flex flex-col font-poppins">
          <h1 className="text-bold text-2xl text-black">
            {Workspace.Workspaces}
          </h1>
          <h4 className="text-sm text-gray400">{Workspace.Subhead1}</h4>
          <h4 className="text-sm text-gray400">{Workspace.Subhead2}</h4>
        </div>
        <CreateWorkspace />
      </div>
      <div className="grid md:grid-cols-2 em:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Later this section with me made using map method */}
        {workspaces.map(item => (
          <Link to={item.link} key={item.link}>
            <WorkspaceCard
              heading={item.heading}
              createdBy={item.createdBy}
              createdOn={item.createdOn}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceDashboard;
