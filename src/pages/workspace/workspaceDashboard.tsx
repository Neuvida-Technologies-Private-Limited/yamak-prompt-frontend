import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { CreateWorkspace, WorkspaceCard } from 'components/helpers';
import { ButtonVariants, Workspace, workspaces } from 'utils/constants';
import { Button, Heading } from 'components/common';
import { GetWorkspaces } from 'middleware/api';
import { workspaceState } from 'middleware/state';

const WorkspaceDashboard: React.FC = () => {
  const [state, setState] = useRecoilState(workspaceState);
  const { workspace_details } = state;

  const getKeyList = async () => {
    try {
      const res = await GetWorkspaces();
      setState(old => ({
        ...old,
        workspace_details: res,
      }));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKeyList();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex sm:flex-col sm:justify-between sm:items-start md:flex-row gap-4 p-6">
        <div className="flex flex-col font-poppins">
          <Heading level={2} children={Workspace.Workspaces} />
          <h4 className="text-sm md:text-base lg:w-3/4">
            {Workspace.Subhead1}
          </h4>
          <h4 className="text-sm md:text-base">{Workspace.Subhead2}</h4>
        </div>
        <CreateWorkspace
          btnName={Workspace.Create}
          className="sm:hidden em:block"
        />
      </div>
      {workspaces.length > 0 ? (
        <div className="">
          <div className="grid md:grid-cols-1 em:grid-cols-2 p-6 h-full bg-gray10 lg:grid-cols-3 gap-3 sm:mb-16 em:mb-0">
            {workspaces.map((item: any, index: number) => (
              <WorkspaceCard
                key={`workspace-card-item-${index}`}
                heading={item.heading}
                link={item.link}
                createdBy={item.createdBy}
                createdOn={item.createdOn}
              />
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
        <div className="flex flex-col justify-center items-center h-full gap-y-2 mt-10 p-6">
          <img src="/assets/images/workspace.svg" alt="No Workspaces Found" />
          <div className="flex font-poppins flex-col items-center gap-1 em:pb-10 sm:py-10">
            <Heading level={4} className="font-bold text-black text-center">
              {Workspace.NoWorkspace}
            </Heading>
            <p className="text-gray700 px-6 text-center">
              {Workspace.NoWorkspaceDesc}
            </p>
          </div>
          <CreateWorkspace
            btnName={Workspace.CreateWorkspace}
            className="sm:w-72 em:w-56 sm:h-12 em:h-10 flex justify-center"
          />
          <Button
            size="small"
            variant={ButtonVariants.LINK}
            onClick={() => {}}
            name={Workspace.ExploreTemplates}
            className="text-secondary underline"
          />
        </div>
      )}
    </div>
  );
};

export default WorkspaceDashboard;
