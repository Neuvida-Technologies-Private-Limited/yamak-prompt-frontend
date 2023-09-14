import React from 'react';
import { FiBookmark, FiUploadCloud } from 'react-icons/fi';
import { CiCalendar } from 'react-icons/ci';
import { BsClock } from 'react-icons/bs';
import { Workspace } from 'utils/constants';

const drafts = () => {
  return (
    <div className="flex justify-between h-fit py-4 px-2">
      <div className="flex flex-col font-poppins text-base">
        <h4 className="text-gray700 font-medium">{Workspace.Prompt}</h4>
        <div className="flex gap-4 font-normal items-center">
          <div className="text-xs flex text-gray300 items-center gap-1">
            <CiCalendar />
            {Workspace.Date}
          </div>
          <div className="text-xs flex text-gray300 items-center gap-1">
            <BsClock />
            {Workspace.Time}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="p-1 bg-secondary text-white rounded">
          <FiBookmark />
        </span>
        <span className="p-1 bg-gray100 text-gray500 rounded">
          <FiUploadCloud />
        </span>
      </div>
    </div>
  );
};

export default drafts;
