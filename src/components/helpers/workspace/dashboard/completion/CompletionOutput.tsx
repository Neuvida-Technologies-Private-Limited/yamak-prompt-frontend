import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { message } from 'antd';
import Typewriter from 'typewriter-effect';

import { Button, Input, Label, Spinner } from 'components/common';
import {
  Workspace,
  InputVariants,
  ButtonVariants,
  ButtonSizes,
} from 'utils/constants';
import { generateOutputState } from 'middleware/state';

interface OutputSectionProps {
  generateOutput: (event: { preventDefault: () => void }) => Promise<void>;
  onUpdatePrompt: (update: any, id: string) => Promise<any>;
  getHistory: (currentPage: number) => Promise<void>;
  currentPage: number;
  bookmarked: boolean;
}

const OutputSection: React.FC<OutputSectionProps> = ({
  generateOutput,
  onUpdatePrompt,
  getHistory,
  bookmarked,
  currentPage,
}) => {
  const [outputState, setOutputState] = useRecoilState(generateOutputState);
  const [isBookmark, setIsBookmark] = useState(bookmarked);

  const { title, output, tags, uuid, isLoading } = outputState;

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

  async function handleBookmark(event: React.MouseEvent) {
    event.stopPropagation();

    setIsBookmark(prev => !prev);
    const updateObj = {
      bookmarked: !isBookmark,
    };
    const res: any = await onUpdatePrompt(JSON.stringify(updateObj), uuid);

    if (res.status !== 200) return message.error(res.error);

    message.success(
      isBookmark ? Workspace.UnbookmarkedSuccess : Workspace.BookmarkedSuccess
    );
    await getHistory(currentPage);
  }

  useEffect(() => {
    setIsBookmark(bookmarked);
  }, [bookmarked]);

  return (
    <div className="flex flex-col max-h-full h-full">
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
      <div className="flex flex-col p-4 font-poppins border rounded-lg border-gray200 bg-white overflow-y-scroll h-full">
        <label className="font-semibold pb-2">{Workspace.Output}</label>
        <div className="h-full">
          {isLoading && <Spinner />}
          {output.length === 0 && !isLoading ? (
            <p className="text-gray100">{Workspace.EnterHere}</p>
          ) : (
            <Typewriter
              options={{
                strings: output[0],
                autoStart: true,
                loop: false,
                delay: 10,
              }}
            />
          )}
        </div>
      </div>
      <div className="flex py-6 md:justify-between items-center sm:flex-wrap md:flex-nowrap sm:gap-2 sm:justify-center">
        <div className="flex items-center gap-4">
          <Button
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.SMALL}
            onClick={generateOutput}
            name={'Submit'}
          />
          <Button
            variant={ButtonVariants.PRIMARY_LIGHT}
            size={ButtonSizes.SMALL}
            onClick={handleBookmark}
            name={'Bookmark'}
            disabled={output.length === 0 ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default OutputSection;
