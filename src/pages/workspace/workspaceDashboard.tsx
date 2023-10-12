import React, { useCallback, useEffect } from 'react';

import moment from 'moment';
import { useRecoilState } from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
import { message } from 'antd';

import { CreateWorkspaceModal, WordspaceCardGrid } from 'components/helpers';
import { Workspace } from 'utils/constants';
import { Heading } from 'components/common';
import {
  GetWorkspaces,
  CreateWorkspace,
  DeleteWorkspace,
  UpdateWorkspace,
} from 'middleware/api';
import { createWorkspaceState, workspaceState } from 'middleware/state';

const WorkspaceDashboard: React.FC = () => {
  const [state, setState] = useRecoilState(workspaceState);
  const [createState] = useRecoilState(createWorkspaceState);
  const { workspace_details } = state;
  const { title, model_key } = createState;

  const getAllWorkspaces = useCallback(
    async function () {
      try {
        const res = await GetWorkspaces();
        const response = Array.isArray(res.results) ? res.results : [];
        if (response.length === 0) {
          setState(old => ({
            ...old,
            workspace_details: [],
          }));
        } else {
          const formattedWorkspaces = response.map(
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
        }
      } catch (error: any) {
        console.log(error);
      }
    },
    [setState]
  );

  const createWorkspace = async () => {
    const createWorkspaceParams = {
      title,
      model_key,
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

  const updateWorkspace = async (update: any, id: string) => {
    try {
      await UpdateWorkspace(update, id);
      message.success('Workspace updated!');
      getAllWorkspaces();
      return true;
    } catch (error) {}
  };

  useEffect(() => {
    getAllWorkspaces();
  }, [getAllWorkspaces]);

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
      <WordspaceCardGrid
        items={workspace_details}
        onDelete={deleteWorkspace}
        onUpdate={updateWorkspace}
        createWorkspace={createWorkspace}
      />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default WorkspaceDashboard;
