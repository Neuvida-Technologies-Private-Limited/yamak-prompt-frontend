import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { Workspace } from 'utils/contants';

interface WorkspaceCardProps {
  heading: string;
  createdBy: string;
  createdOn: string;
}

const index: React.FC<WorkspaceCardProps> = ({
  heading,
  createdOn,
  createdBy,
}) => {
  return (
    <div className="font-poppins p-3 border-2 rounded-lg flex flex-col justify-between gap-10 hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <h1 className="text-bold text-lg text-black">{heading}</h1>
        <div className="cursor-pointer rounded-3xl p-1 hover:bg-gray200 transition">
          <FiMoreVertical />
        </div>
      </div>
      <div className="flex flex-col text-xs text-gray400 font-light">
        <div className="flex">
          <label>{Workspace.CreatedBy}</label>
          <p className="pl-1">{createdBy}</p>
        </div>
        <div className="flex">
          <label>{Workspace.CreatedOn}</label>
          <p className="pl-1">{createdOn}</p>
        </div>
      </div>
    </div>
  );
};

export default index;
