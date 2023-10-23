import React from 'react';

import { EmptyWorkspace } from 'components/helpers';
import WorkspaceCard from './Card';
import { WorkspaceDetailsType } from 'types';
import { Pagination } from 'components/common';

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
      {items.length === 0 ? (
        <EmptyWorkspace createWorkspace={createWorkspace} />
      ) : (
        <div className="flex flex-col">
          <div className="grid md:grid-cols-1 em:grid-cols-2 p-6 h-full bg-gray50 lg:grid-cols-3 gap-3">
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
          <Pagination type="workspace" />
        </div>
      )}
    </div>
  );
};

export default WorkspaceCardGrid;
