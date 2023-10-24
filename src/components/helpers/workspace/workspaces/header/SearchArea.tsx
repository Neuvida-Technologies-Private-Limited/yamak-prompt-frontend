import React, { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { Button, Input, Select } from 'components/common';
import { workspacePaginationState } from 'middleware/state';
import {
  Workspace,
  ButtonVariants,
  InputVariants,
  ItemsPerPageOptions,
} from 'utils/constants';

interface WorkspaceSearchAreaProps {
  onSearchWorkspace: (input: string) => void;
}

const WorkspaceSearchArea: React.FC<WorkspaceSearchAreaProps> = ({
  onSearchWorkspace,
}) => {
  const [input, setInput] = useState('');
  const [{ itemsPerPage }, setPagination] = useRecoilState(
    workspacePaginationState
  );

  function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (input.length === 0) return;
    setPagination(old => ({ ...old, query: input, currentPage: 1 }));
    onSearchWorkspace(input);
  }

  function itemsPerPageChangeHandler(value: string) {
    setPagination(old => ({
      ...old,
      currentPage: 1,
      itemsPerPage: Number(value),
    }));
  }

  useEffect(() => {
    if (input === '') {
      setPagination(old => ({ ...old, query: '' }));
    }
  }, [setPagination, input]);

  return (
    <div className="flex sm:flex-col md:flex-row md:justify-between md:items-center sm:items-end p-6 border-b-2 border-gray50 gap-4">
      <form
        onSubmit={formSubmitHandler}
        className="flex md:flex-row md:w-1/2 sm:w-full justify-between items-start gap-2"
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

      <div className="flex items-center gap-2">
        <label className="text-gray900">Items</label>
        <Select
          onChange={itemsPerPageChangeHandler}
          value={String(itemsPerPage)}
          options={ItemsPerPageOptions}
        />
      </div>
    </div>
  );
};

export default WorkspaceSearchArea;
