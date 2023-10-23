import React, { useCallback, useEffect } from 'react';

import moment from 'moment';
import { useRecoilState } from 'recoil';
import { message } from 'antd';

import {
  WordspaceCardGrid as CardGrid,
  WorkspaceHeader as Header,
  WorkspaceHeadingArea as HeadingArea,
  WorkspaceSearchArea as SearchArea,
} from 'components/helpers';
import { ITEMS_PER_PAGE } from 'utils/constants';
import {
  getWorkspaces,
  CreateWorkspace,
  DeleteWorkspace,
  UpdateWorkspace,
} from 'middleware/api';
import {
  createWorkspaceState,
  workspacePaginationState,
  workspaceState,
} from 'middleware/state';

const Workspaces: React.FC = () => {
  const [state, setState] = useRecoilState(workspaceState);
  const [createState] = useRecoilState(createWorkspaceState);
  const [pagination, setPaginationState] = useRecoilState(
    workspacePaginationState
  );
  const { workspace_details } = state;
  const { title, model_key } = createState;

  const getAllWorkspaces = useCallback(
    async function (currentPage: number) {
      try {
        const res = await getWorkspaces(currentPage);
        const formattedWorkspaces = res.results.map(
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
        setPaginationState(old => ({
          ...old,
          count: res.count,
          hasNext: res.next,
          hasPrevious: res.previous,
          totalPages: Math.ceil(res.count / ITEMS_PER_PAGE),
        }));
      } catch (error: any) {
        message.error(error);
      }
    },
    [setState, setPaginationState]
  );

  const createWorkspace = async () => {
    const createWorkspaceParams = {
      title,
      model_key,
    };

    try {
      await CreateWorkspace(createWorkspaceParams);
      await getAllWorkspaces(pagination.currentPage);
      message.success('Workspace created successfully');
      return true;
    } catch (error: any) {
      const errorMessage = error.error;
      message.error(errorMessage);
      return false;
    }
  };

  const deleteWorkspace = async (id: string | undefined) => {
    try {
      if (id) {
        await DeleteWorkspace(id);
        await getAllWorkspaces(pagination.currentPage);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      message.error('Workspace cannot be deleted, please login again !');
    }
  };

  const updateWorkspace = async (update: any, id: string) => {
    try {
      await UpdateWorkspace(update, id);
      message.success('Workspace updated!');
      getAllWorkspaces(pagination.currentPage);
      return true;
    } catch (error) {}
  };

  useEffect(() => {
    getAllWorkspaces(pagination.currentPage);
  }, [getAllWorkspaces, pagination.currentPage]);

  return (
    <div className="flex flex-col h-screen overflow-y-scroll">
      <Header>
        <HeadingArea onCreateWorkspace={createWorkspace} />
        <SearchArea />
      </Header>
      <CardGrid
        items={workspace_details}
        onDelete={deleteWorkspace}
        onUpdate={updateWorkspace}
        createWorkspace={createWorkspace}
      />
    </div>
  );
};

export default Workspaces;
