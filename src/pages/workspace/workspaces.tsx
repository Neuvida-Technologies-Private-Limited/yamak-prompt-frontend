import React, { useEffect, useState } from 'react';
import { HiOutlineRefresh, HiPlus, HiOutlineChatAlt2 } from 'react-icons/hi';
import { Button, Input, Tabs } from 'components/common';
import {
  WorkspaceHistory,
  WorkspaceInputs,
  WorkspaceOutput,
  WorkspaceParameters,
} from 'components/helpers';
import { Workspace, InputVariants } from 'utils/constants';
import { BsCheck2Circle } from 'react-icons/bs';

interface WorkspaceProps {
  label: string;
}

const handleClick = () => {};
const handleChange = () => {};

const Index: React.FC<WorkspaceProps> = ({ label }) => {
  const isDekstopView = window.innerWidth >= 768;

  return (
    <div className="flex flex-col h-screen">
      <div className="grid items-center p-8 border-b-4 border-gray50 sm:justify-center md:justify-between md:grid-cols-2 sm:grid-cols-1">
        <div className="flex sm:justify-center md:justify-start">
          <h1 className="text-2xl font-poppins font-semibold pr-3">
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
        <div className="flex gap-2 md:justify-end sm:justify-center">
          <Button
            size={undefined}
            type={'link'}
            shape={undefined}
            icon={<HiOutlineRefresh />}
            name={Workspace.Reset}
            onClick={handleClick}
            className="items-center flex font-poppins text-primary800 font-medium p-4 border-2 border-primary50 bg-primary50 rounded-lg"
          />
          <Button
            size={undefined}
            type={'default'}
            shape={undefined}
            name={Workspace.Publish}
            onClick={handleClick}
            className="publishedBtn border-black p-4 border-2 rounded-lg font-medium text-black font-poppins transition-all ease-in-out duration-300"
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
            className="items-center"
          />
        </div>
        <div className="flex py-2 justify-center items-center">
          <Input
            id={Workspace.SearchPrompt}
            name={Workspace.SearchPrompt}
            placeholder={Workspace.SearchPrompt}
            onChange={handleChange}
            className="!mb-0 sm:hidden md:block"
            type="search"
            variant={InputVariants.Filled}
          />
          <WorkspaceParameters />
        </div>
      </div>
      <div className="lg:flex lg:flex-row sm:grid md:grid-col-2 sm:grid-col-1 h-3/4 px-4 !overflow-y-scroll">
        {isDekstopView ? (
          <div className="lg:w-1/3 pt-4 pr-4 border-r-4 border-gray50 col-span-1 md:flex sm:hidden">
            <WorkspaceHistory />
          </div>
        ) : null}

        <div className="lg:w-2/6 pt-6 px-4 col-span-1">
          <WorkspaceInputs />
        </div>
        <div className="lg:w-3/6 pt-6 pl-4 md:col-span-2">
          <WorkspaceOutput />
        </div>
      </div>
    </div>
  );
};

export default Index;
