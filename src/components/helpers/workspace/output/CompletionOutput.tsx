import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Typewriter from 'typewriter-effect';

import { Button, Input, Label } from 'components/common';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import { generateOutputState } from 'middleware/state';

interface OutputSectionProps {
  generateOutput: (event: { preventDefault: () => void }) => Promise<void>;
}

const OutputSection: React.FC<OutputSectionProps> = ({ generateOutput }) => {
  const [outputState, setOutputState] = useRecoilState(generateOutputState);
  const { title, output, tags } = outputState;

  const handleTitleChange = (title: string) => {
    setOutputState(old => ({
      ...old,
      title,
    }));
  };
  const handleLabelsChange = (tags: string) => {
    setOutputState(old => ({
      ...old,
      tags: tags,
    }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center pb-4">
        <Input
          id={Workspace.PromptTitle}
          name={Workspace.PromptTitle}
          placeholder={Workspace.PromptTitle}
          onChange={handleTitleChange}
          variant={InputVariants.Filled}
          className="!w-1/2 !mb-0"
          value={title}
        />
        <Label onChange={handleLabelsChange} initialLabels={tags} />
      </div>
      <div className="flex flex-col font-poppins border rounded-lg border-gray200 p-4 h-full overflow-hidden">
        <label className="font-semibold pb-2">{Workspace.Output}</label>
        <div className="overflow-y-scroll h-full">
          {output ? (
            <Typewriter
              options={{
                strings: output,
                autoStart: true,
                loop: false,
                delay: 50,
              }}
            />
          ) : (
            <p className="text-gray100">{Workspace.EnterHere}</p>
          )}
        </div>
      </div>
      <div className="flex py-6 md:justify-between items-center sm:flex-wrap md:flex-nowrap sm:gap-2 sm:justify-center">
        <div className="flex items-center gap-4">
          <Button
            variant={ButtonVariants.PRIMARY}
            size="small"
            onClick={generateOutput}
            name={'Submit'}
          />
          <Button
            variant={ButtonVariants.PRIMARY_LIGHT}
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
