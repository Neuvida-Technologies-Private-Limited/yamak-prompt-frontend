import React from 'react';
import { Workspace } from '../../../../utils/constants';
import { FiMoreVertical } from 'react-icons/fi';

const index: React.FC = () => {
  return (
    <div className="font-poppins w-1/4 p-3 border-2 rounded-lg flex flex-col justify-between gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-bold text-lg">{Workspace.Space1}</h1>
        <div className="cursor-pointer rounded-3xl p-1 hover:bg-white transition">
          <FiMoreVertical />
        </div>
      </div>
      <div className="flex flex-col text-xs text-gray-400 font-light">
        <label>{Workspace.CreatedBy}</label>
        <label>{Workspace.CreatedOn}</label>
      </div>
    </div>
  );
};

export default index;
