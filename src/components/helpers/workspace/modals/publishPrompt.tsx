import { Button } from 'components/common';
import React from 'react';
import { Workspace, ButtonVariants } from 'utils/constants';

export const publishPrompt = () => {
  const handleClick = () => {};
  return (
    <div>
      <Button
        size={undefined}
        variant={ButtonVariants.OUTLINED}
        name={Workspace.Publish}
        onClick={handleClick}
      />
    </div>
  );
};
