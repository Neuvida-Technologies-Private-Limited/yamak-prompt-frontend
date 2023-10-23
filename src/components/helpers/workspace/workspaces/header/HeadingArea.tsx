import { Heading, Text } from 'components/common';
import { CreateWorkspaceModal } from 'components/helpers';
import { TextVariants, Workspace } from 'utils/constants';
import React from 'react';

interface HeaderAreaProps {
  onCreateWorkspace: () => Promise<boolean>;
}

const HeadingArea: React.FC<HeaderAreaProps> = ({ onCreateWorkspace }) => {
  return (
    <div className="flex sm:flex-col md:flex-row sm:justify-between sm:items-start gap-4 border-b-2 border-gray50 p-6">
      <div className="flex flex-col font-poppins">
        <Heading level={2} children={Workspace.Workspaces} />
        <Text variant={TextVariants.MEDIUM} children={Workspace.Subhead1} />
        <Text variant={TextVariants.MEDIUM} children={Workspace.Subhead2} />
      </div>
      <CreateWorkspaceModal
        btnName={Workspace.Create}
        createWorkspace={onCreateWorkspace}
      />
    </div>
  );
};

export default HeadingArea;
