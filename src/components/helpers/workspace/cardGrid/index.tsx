import React from 'react';

import { CreateWorkspaceModal, EmptyWorkspace } from 'components/helpers';
import WorkspaceCard from './Card';
import { Workspace } from 'utils/constants';
import { WorkspaceDetailsType } from 'types';

interface WorkspaceCardGridProps {
  items: WorkspaceDetailsType[];
  onDelete: (id: string) => Promise<boolean | undefined>;
  onUpdate: (update: any, id: string) => Promise<boolean | undefined>;
  createWorkspace: () => Promise<boolean>;
}

const WorkspaceCardGrid: React.FC<WorkspaceCardGridProps> = ({
  items,
  onDelete,
  onUpdate,
  createWorkspace,
}) => {
  return (
    <div>
      {items.length > 0 ? (
        <div className="">
          <div className="grid md:grid-cols-1 em:grid-cols-2 p-6 h-full bg-gray10 lg:grid-cols-3 gap-3 sm:mb-16 em:mb-0">
            {items.map((item: any, index: number) => (
              <WorkspaceCard
                key={`workspace-card-item-${index}`}
                id={item.id}
                heading={item.title}
                createdBy={item.createdBy}
                createdOn={item.timestamp}
                last_edited={item.last_modified}
                onDelete={onDelete}
                model_key={item.model_key}
                onUpdate={onUpdate}
              />
            ))}
          </div>
          <div className="sm:flex em:hidden bottom-0 z-2 fixed items-center justify-center w-full rounded-t-xl bg-gray100 py-4">
            <CreateWorkspaceModal
              btnName={Workspace.CreateWorkspace}
              className="w-72 h-12 flex justify-center"
              createWorkspace={createWorkspace}
            />
          </div>
        </div>
      ) : (
        <EmptyWorkspace createWorkspace={createWorkspace} />
      )}
    </div>
  );
};

export default WorkspaceCardGrid;
