import { Workspace } from 'utils/constants';
import { Heading, Button } from 'components/common';
import { CreateWorkspaceModal } from 'components/helpers';
import { ButtonVariants } from 'utils/constants';

const EmptyWorkspace: React.FC<{ createWorkspace: () => Promise<boolean> }> = ({
  createWorkspace,
}) => {
  return (
    <div className="flex flex-col items-center h-full gap-y-2 mt-5 p-6">
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
  );
};

export default EmptyWorkspace;
