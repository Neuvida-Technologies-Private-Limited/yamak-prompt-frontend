import React from 'react';
import { HiOutlineRefresh, HiPlus, HiOutlineChatAlt2 } from 'react-icons/hi';
import { Button, Search, Tabs } from 'components/common';
import {
  WorkspaceHistory,
  WorkspaceInputs,
  WorkspaceOutput,
  WorkspaceParameters,
} from 'components/helpers';
import { Workspace } from 'utils/constants';
import { BsCheck2Circle } from 'react-icons/bs';

interface WorkspaceProps {
  label: string;
}

const handleClick = () => {};

const workspace: React.FC<WorkspaceProps> = ({ label }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-8 border-b-4 border-gray50">
        <div className="flex">
          <h1 className="text-2xl font-poppins font-bold pr-3">
            {Workspace.Marketing}
          </h1>
          <Button
            size={undefined}
            type={'default'}
            shape={'default'}
            icon={<HiPlus />}
            onClick={handleClick}
            className="bg-primary hover:bg-primary900 hover:!text-white text-white flex justify-center rounded-lg border-none"
          />
        </div>
        <div className="flex gap-2">
          <Button
            size={undefined}
            type={'link'}
            shape={undefined}
            icon={<HiOutlineRefresh />}
            name={Workspace.Reset}
            onClick={handleClick}
            className="items-center flex font-poppins text-primary800 font-semibold p-4 border-2 border-primary50 bg-primary50 rounded-lg"
          />
          <Button
            size={undefined}
            type={'default'}
            shape={undefined}
            name={Workspace.Publish}
            onClick={handleClick}
            className="publishedBtn border-black p-4 border-2 rounded-lg font-bold text-black font-poppins transition-all ease-in-out duration-300"
          />
        </div>
      </div>
      <div className="flex px-8 py-2 border-b-4 border-gray50 justify-between">
        <div className="flex">
          <Tabs
            tab1={Workspace.Chat}
            tab2={Workspace.Completion}
            icon1={<HiOutlineChatAlt2 />}
            icon2={<BsCheck2Circle />}
          />
        </div>
        <div className="flex py-2">
          <Search
            placeholder={Workspace.SearchPrompt}
            className="workspaceSearch"
          />
          <WorkspaceParameters />
        </div>
      </div>
      <div className="flex flex-row h-3/4 pr-8">
        <div className="w-1/4 pt-4 pr-3 border-r-4 border-gray50">
          <WorkspaceHistory />
        </div>
        <div className="w-2/6 pt-6 px-4">
          <WorkspaceInputs />
        </div>
        <div className="w-3/6 pt-6 pl-4">
          <WorkspaceOutput />
        </div>
      </div>
    </div>
  );
};

export default workspace;
