import React from 'react';

import { useRecoilState } from 'recoil';

import { EmptyWorkspace } from 'components/helpers';
import WorkspaceCard from './Card';
import { WorkspaceDetailsType } from 'types';
import { Pagination } from 'components/common';
import { workspacePaginationState } from 'middleware/state';

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
  const [{ totalPages }] = useRecoilState(workspacePaginationState);
  return (
    <div>
      {items.length > 0 ? (
        <div className="flex flex-col">
          <div className="grid md:grid-cols-1 em:grid-cols-2 p-6 h-full bg-gray10 lg:grid-cols-3 gap-3">
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
          {totalPages >= 2 ? <Pagination type="workspace" /> : null}
        </div>
      ) : (
        <EmptyWorkspace createWorkspace={createWorkspace} />
      )}
    </div>
  );
};

export default WorkspaceCardGrid;
