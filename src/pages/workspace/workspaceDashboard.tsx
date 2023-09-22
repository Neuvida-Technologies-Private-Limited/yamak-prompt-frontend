import React from 'react';
import { Link } from 'react-router-dom';
import { CreateWorkspace, WorkspaceCard } from 'components/helpers';
import { Workspace, workspaces } from 'utils/constants';
import { Heading } from 'components/common';

const WorkspaceDashboard: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-6">
        <div className="flex flex-col font-poppins">
          <Heading
            variant="mainHeading"
            children={Workspace.Workspaces}
            className="mb-2 sm:text-center em:text-start"
          />
          <h4 className="text-sm md:text-base text-gray400 sm:text-center em:text-start">
            {Workspace.Subhead1}
          </h4>
          <h4 className="text-sm md:text-base text-gray400 sm:text-center em:text-start">
            {Workspace.Subhead2}
          </h4>
        </div>
        <CreateWorkspace
          btnName={Workspace.Create}
          className="sm:hidden em:block"
        />
      </div>
      {workspaces.length > 0 ? (
        <div className="">
          <div className="grid md:grid-cols-1 em:grid-cols-2 p-6 h-full bg-gray10 lg:grid-cols-3 gap-3 sm:mb-16 em:mb-0">
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
          <div className="sm:flex em:hidden bottom-0 z-2 fixed items-center justify-center w-full bg-gray100 rounded-t-xl py-4">
            <CreateWorkspace
              btnName={Workspace.CreateWorkspace}
              className="w-72 h-12 flex justify-center"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <img
            src="/assets/images/workspace.svg"
            alt="No Workspaces Found"
            className="pb-6"
          />
          <div className="flex font-poppins flex-col items-center gap-1 em:pb-10 sm:py-10">
            <h2 className="font-bold text-black">{Workspace.NoWorkspace}</h2>
            <p className="text-gray700 px-6 text-center">
              {Workspace.NoWorkspaceDesc}
            </p>
          </div>
          <CreateWorkspace
            btnName={Workspace.CreateWorkspace}
            className="sm:w-72 em:w-56 sm:h-12 em:h-10 flex justify-center"
          />
        </div>
      )}
    </div>
  );
};

export default WorkspaceDashboard;
