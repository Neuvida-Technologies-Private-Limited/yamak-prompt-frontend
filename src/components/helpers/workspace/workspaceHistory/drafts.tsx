import React from 'react';
import { FiBookmark, FiUploadCloud } from 'react-icons/fi';
import { CiCalendar } from 'react-icons/ci';
import { BsClock } from 'react-icons/bs';
import { Workspace } from 'utils/constants';

const drafts = () => {
  return (
    <div className="">
      <div className="flex justify-between">
        <div className="flex flex-col font-poppins text-base">
          <h4 className="text-gray700">{Workspace.Prompt}</h4>
          <div className="flex gap-2">
            <div className="text-xs flex text-gray300">
              <CiCalendar />
              {Workspace.Date}
            </div>
            <div className="text-xs flex text-gray300">
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
      <div className=""></div>
    </div>
  );
};

export default drafts;
