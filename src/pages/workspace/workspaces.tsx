import React from 'react';
import { HiOutlineRefresh, HiPlus } from 'react-icons/hi';
import { Button, Search } from 'components/common';
import {
  WorkspaceInputs,
  WorkspaceOutput,
  WorkspaceParameters,
} from 'components/helpers';
import { Workspace } from 'utils/constants';

interface WorkspaceProps {
  label: string;
}

const handleClick = () => {};

const workspace: React.FC<WorkspaceProps> = ({ label }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-8 border-b-2">
        <div className="flex">
          <h1 className="text-2xl font-poppins font-bold pr-3">Workspace 1</h1>
          <Button
            size={undefined}
            type={'default'}
            shape={'default'}
            icon={<HiPlus />}
            onClick={handleClick}
            className="bg-gray200 border-none"
          />
        </div>
        <div className="flex">
          <Button
            size={undefined}
            type={'link'}
            shape={undefined}
            icon={<HiOutlineRefresh />}
            name={Workspace.Reset}
            onClick={handleClick}
            className="items-center flex font-poppins text-black"
          />
          <Button
            size={undefined}
            type={'default'}
            shape={undefined}
            name={Workspace.Publish}
            onClick={handleClick}
            className="publishedBtn border-secondary border-2 font-bold text-secondary font-poppins transition-all ease-in-out duration-300"
          />
        </div>
      </div>
      <div className="flex px-8 py-4 border-b-2 justify-between">
        <div className="flex">
          <Search
            placeholder={Workspace.SearchPrompt}
            className="workspaceSearch"
          />
        </div>
        <div className="flex">
          <WorkspaceParameters />
        </div>
      </div>
      <div className="flex flex-row h-full px-8">
        <div className="w-1/5 pt-8 pr-6 border-r-2">yo</div>
        <div className="w-2/5 pt-8 px-6">
          <WorkspaceInputs />
        </div>
        <div className="w-2/5 pt-8 pl-6">
          <WorkspaceOutput />
        </div>
      </div>
    </div>
  );
};

export default workspace;
