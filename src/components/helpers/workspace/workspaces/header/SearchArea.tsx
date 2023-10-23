import { Button, Input } from 'components/common';
import React, { useState } from 'react';
import { Workspace, ButtonVariants, InputVariants } from 'utils/constants';

const WorkspaceSearchArea = () => {
  const [input, setInput] = useState('');

  function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div className="md:flex-row md:w-1/2 justify-between items-start p-6">
      <form onSubmit={formSubmitHandler} className="flex gap-2">
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
