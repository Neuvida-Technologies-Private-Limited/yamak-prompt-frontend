import React, { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { Button, Input } from 'components/common';
import { workspacePaginationState } from 'middleware/state';
import { Workspace, ButtonVariants, InputVariants } from 'utils/constants';

interface WorkspaceSearchAreaProps {
  onSearchWorkspace: (input: string) => void;
}

const WorkspaceSearchArea: React.FC<WorkspaceSearchAreaProps> = ({
  onSearchWorkspace,
}) => {
  const [input, setInput] = useState('');
  const [, setPagination] = useRecoilState(workspacePaginationState);

  function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (input.length === 0) return;
    setPagination(old => ({ ...old, query: input, currentPage: 1 }));
    onSearchWorkspace(input);
  }

  useEffect(() => {
    if (input === '') {
      setPagination(old => ({ ...old, query: '' }));
    }
  }, [setPagination, input]);

  return (
    <div className="p-6 border-b-2 border-gray50">
      <form
        onSubmit={formSubmitHandler}
        className="flex md:flex-row md:w-1/2 justify-between items-start gap-2"
      >
        <Input
          id={Workspace.WORKSPACE_SEARCH_TITLE}
          name={Workspace.WORKSPACE_SEARCH_TITLE}
          placeholder={Workspace.WORKSPACE_SEARCH_PLACEHOLDER}
          value={input}
          onChange={setInput}
          type="search"
          variant={InputVariants.Filled}
        />
        <Button
          variant={ButtonVariants.PRIMARY_LIGHT}
          name="Search"
          htmlType="submit"
        />
      </form>
    </div>
  );
};

export default WorkspaceSearchArea;
