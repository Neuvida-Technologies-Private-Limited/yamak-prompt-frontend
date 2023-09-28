import React from 'react';
import { Button, Input, TextArea, Label } from 'components/common';
import { Workspace, InputVariants } from 'utils/constants';

const OutputSection: React.FC = () => {
  const handleChange = () => {};

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center">
        <Input
          id={Workspace.PromptTitle}
          name={Workspace.PromptTitle}
          placeholder={Workspace.PromptTitle}
          onChange={handleChange}
          variant={InputVariants.Filled}
          className="!w-1/2 !mb-0"
        />
        <Label />
      </div>
      <div className="flex flex-col font-poppins border rounded-lg border-gray200 p-4 h-full">
        <label className="font-semibold pb-2">{Workspace.Output}</label>
        <TextArea
          id={Workspace.EnterHere}
          name={Workspace.EnterHere}
          rows={10}
          placeholder={Workspace.EnterHere}
          maxLength={0}
          className="!resize-none !h-full focus:border-gray50 hover:border-0"
          onChange={handleChange}
        />
      </div>
      <div className="flex py-6 md:justify-between items-center sm:flex-wrap md:flex-nowrap sm:gap-2 sm:justify-center">
        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="small"
            onClick={() => {}}
            name={'Submit'}
          />
          <Button
            variant="default"
            size="small"
            onClick={() => {}}
            name={'Bookmark'}
          />
        </div>
        <div className="font-poppins text-xs text-primary700 p-2 border-2 border-primary700 rounded-2xl">
          {Workspace.CharacterLimit}
        </div>
      </div>
    </div>
  );
};

export default OutputSection;
