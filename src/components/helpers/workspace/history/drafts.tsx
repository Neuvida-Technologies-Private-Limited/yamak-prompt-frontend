import React, { useState } from 'react';

import { message } from 'antd';
import { FiBookmark, FiUploadCloud } from 'react-icons/fi';

import { Button, Tooltip } from 'components/common';
import { ButtonSizes, ButtonVariants, Workspace } from 'utils/constants';

interface DraftProps {
  title: string;
  onUpdatePrompt: (update: any, id: string) => Promise<any>;
  uuid: string;
  bookmarked: boolean;
}

const Drafts: React.FC<DraftProps> = ({
  title,
  onUpdatePrompt,
  uuid,
  bookmarked,
}) => {
  const [isBookmark, setIsBookmark] = useState(bookmarked);

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
  }

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('Bookmark clicked');
  };

  const handleHistory: React.MouseEventHandler = () => {
    console.log('History clicked');
  };
  return (
    <div className="flex justify-between h-fit py-3">
      <div
        className="flex flex-col font-poppins text-base cursor-pointer w-full"
        onClick={handleHistory}
      >
        <h4 className="text-gray700 font-medium hover:text-primary transition ease-in-out">
          {title}
        </h4>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip
          element={
            <Button
              variant={ButtonVariants.SECONDARY}
              icon={<FiBookmark />}
              size={ButtonSizes.SMALL}
              onClick={handleBookmark}
            />
          }
          title={'Bookmark'}
          color="white"
        />

        <Tooltip
          element={
            <Button
              variant={ButtonVariants.OUTLINED_LIGHT}
              icon={<FiUploadCloud />}
              size={ButtonSizes.SMALL}
              onClick={handleClick}
            />
          }
          title={'Publish'}
          color="white"
        />
      </div>
    </div>
  );
};

export default Drafts;
