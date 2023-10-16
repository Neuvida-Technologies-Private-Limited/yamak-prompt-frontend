import { Button, Tooltip } from 'components/common';
import React from 'react';
import { FiBookmark, FiUploadCloud } from 'react-icons/fi';

import { ButtonSizes, ButtonVariants, Workspace } from 'utils/constants';

interface DraftProps {
  title: string;
}

const drafts: React.FC<DraftProps> = ({ title }) => {
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
              onClick={handleClick}
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

export default drafts;
