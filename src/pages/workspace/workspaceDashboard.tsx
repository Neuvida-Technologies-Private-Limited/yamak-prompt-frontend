import React from 'react';
import { Link } from 'react-router-dom';
import { CreateWorkspace, WorkspaceCard } from 'components/helpers';
import { Workspace, workspaces } from 'utils/constants';
import { Heading } from 'components/common';

const WorkspaceDashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between p-6">
        <div className="flex flex-col font-poppins">
          <Heading
            variant="mainHeading"
            children={Workspace.Workspaces}
            className="mb-2"
          />
          <h4 className="text-sm text-gray400">{Workspace.Subhead1}</h4>
          <h4 className="text-sm text-gray400">{Workspace.Subhead2}</h4>
        </div>
        <CreateWorkspace btnName={Workspace.Create} />
      </div>
      {workspaces.length > 0 ? (
        <div className="grid md:grid-cols-1 em:grid-cols-2 p-6 h-full bg-gray10 lg:grid-cols-3 gap-3">
          {workspaces.map((item: any) => (
            <Link to={item.link} key={item.link}>
              <WorkspaceCard
                heading={item.heading}
                createdBy={item.createdBy}
                createdOn={item.createdOn}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <img
            src="/assets/images/workspace.svg"
            alt="No Workspaces Found"
            className="pb-6"
          />
          <div className="flex font-poppins flex-col items-center gap-1 pb-10">
            <h2 className="font-bold text-black">{Workspace.NoWorkspace}</h2>
            <p className="text-gray700">{Workspace.NoWorkspaceDesc}</p>
          </div>
          <CreateWorkspace btnName={Workspace.CreateWorkspace} />
        </div>
      )}
    </div>
  );
};

export default WorkspaceDashboard;
