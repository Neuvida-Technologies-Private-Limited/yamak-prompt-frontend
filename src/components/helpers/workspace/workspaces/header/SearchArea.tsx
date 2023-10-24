import { Button, Input } from 'components/common';
import React, { useState } from 'react';
import { Workspace, ButtonVariants, InputVariants } from 'utils/constants';

const WorkspaceSearchArea = () => {
  const [input, setInput] = useState('');

  function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
  }

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
