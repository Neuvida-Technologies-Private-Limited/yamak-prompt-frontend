import React, { useEffect } from 'react';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';

import { CreateWorkspaceModal, WorkspaceCard } from 'components/helpers';
import { ButtonVariants, Workspace } from 'utils/constants';
import { Button, Heading } from 'components/common';
import {
  GetWorkspaces,
  CreateWorkspace,
  DeleteWorkspace,
} from 'middleware/api';
import { createWorkspaceState, workspaceState } from 'middleware/state';

const WorkspaceDashboard: React.FC = () => {
  const [state, setState] = useRecoilState(workspaceState);
  const [createState, setCreateState] = useRecoilState(createWorkspaceState);
  const { workspace_details } = state;
  const { title, modal_key } = createState;

  const getAllWorkspaces = async () => {
    try {
      const res = await GetWorkspaces();
      const formattedWorkspaces = res.map(
        (item: {
          last_modified: moment.MomentInput;
          timestamp: moment.MomentInput;
        }) => ({
          ...item,
          last_modified: moment(item.last_modified).format('h:mm A'),
          timestamp: moment(item.timestamp).format('Do MMMM YYYY'),
        })
      );
      setState(old => ({
        ...old,
        workspace_details: formattedWorkspaces,
      }));
    } catch (error: any) {
      console.log(error);
    }
  };

  const createWorkspace = async () => {
    const createWorkspaceParams = {
      title,
      modal_key,
    };

    try {
      await CreateWorkspace(createWorkspaceParams);
      getAllWorkspaces();
      toast.success('Workspace created successfully');
      return true;
    } catch (error: any) {
      const errorMessage = error.error;
      toast.error(errorMessage);
      return false;
    }
  };

  const deleteWorkspace = async (id: string | undefined) => {
    try {
      if (id) {
        await DeleteWorkspace(id);
        getAllWorkspaces();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      toast.error('Workspace cannot be deleted, please login again !');
    }
  };

  useEffect(() => {
    getAllWorkspaces();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-scroll">
      <div className="flex sm:flex-col sm:justify-between sm:items-start md:flex-row gap-4 p-6">
        <div className="flex flex-col font-poppins">
          <Heading level={2} children={Workspace.Workspaces} />
          <h4 className="text-sm md:text-base lg:w-3/4">
            {Workspace.Subhead1}
          </h4>
          <h4 className="text-sm md:text-base">{Workspace.Subhead2}</h4>
        </div>
        <CreateWorkspaceModal
          btnName={Workspace.Create}
          className="sm:hidden em:block"
          createWorkspace={createWorkspace}
        />
      </div>
      {workspace_details.length > 0 ? (
        <div className="">
          <div className="grid md:grid-cols-1 em:grid-cols-2 p-6 h-full bg-gray10 lg:grid-cols-3 gap-3 sm:mb-16 em:mb-0">
            {workspace_details.map((item: any, index: number) => (
              <WorkspaceCard
                key={`workspace-card-item-${index}`}
                id={item.id}
                heading={item.title}
                createdBy={item.createdBy}
                createdOn={item.timestamp}
                last_edited={item.last_modified}
              />
            ))}
          </div>
          <div className="sm:flex em:hidden bottom-0 z-2 fixed items-center justify-center w-full bg-gray100 rounded-t-xl py-4">
            <CreateWorkspaceModal
              btnName={Workspace.CreateWorkspace}
              className="w-72 h-12 flex justify-center"
              createWorkspace={createWorkspace}
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
          <CreateWorkspaceModal
            btnName={Workspace.CreateWorkspace}
            className="sm:w-72 em:w-56 sm:h-12 em:h-10 flex justify-center"
            createWorkspace={createWorkspace}
          />
          <Button
            size="small"
            variant={ButtonVariants.SECONDARY_LINK}
            onClick={() => {}}
            name={Workspace.ExploreTemplates}
          />
        </div>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default WorkspaceDashboard;
