import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

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
    <div className="font-poppins p-4 bg-white rounded-lg flex flex-col justify-between gap-6 hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="flex justify-between h-full py-2">
        <div className="flex h-full">
          <div className="w-1.5 bg-secondary rounded-xl h-12" />
          <div className="flex flex-col h-full px-2">
            <h1 className="text-bold text-lg text-black">{heading}</h1>
            <h3 className="text-gray500 font-light">{createdOn}</h3>
          </div>
        </div>
        <BsThreeDots />
      </div>
      <div className="flex flex-col text-xs text-gray900 font-light">
        <div className="flex">
          <p className="pl-1">{createdBy}</p>
        </div>
      </div>
    </div>
  );
};

export default index;
