import React from 'react';
import { IoListCircleOutline } from 'react-icons/io5';
import Draft from './drafts';
import { Workspace, InputVariants } from 'utils/constants';
import { Button, Input } from 'components/common';

// later these will come from API

const handleChange = () => {};
const handleClick = () => {};

const index: React.FC = () => {
  return (
    <div className="flex flex-col pl-4 h-full w-full">
      <div className="flex justify-between items-center font-poppins h-1/6">
        <h1 className="font-semibold text-base">{Workspace.History}</h1>
        <IoListCircleOutline size={25} />
      </div>
      <Input
        id={Workspace.SearchLibrary}
        name={Workspace.SearchLibrary}
        placeholder={Workspace.SearchLibrary}
        type={Workspace.Search}
        onChange={handleChange}
        variant={InputVariants.Filled}
      />
      <div className="flex flex-col h-5/6">
        <div className="pt-2 overflow-y-scroll pr-2 h-5/6">
          {Array.from(Array(10)).map((_, index) => (
            <Draft key={`draft-item-${index}`} />
          ))}
        </div>
        <div className="flex justify-between h-1/6 pt-4">
          <Button
            size={undefined}
            variant="outlined"
            onClick={handleClick}
            name={Workspace.ShowBookmarked}
            className="border-black font-medium text-black border-2 rounded-xl"
          />
          <Button
            size={undefined}
            variant="primary"
            onClick={handleClick}
            name={Workspace.ShowPublished}
            className="border-gray200 font-medium text-gray200 border-2 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default index;
