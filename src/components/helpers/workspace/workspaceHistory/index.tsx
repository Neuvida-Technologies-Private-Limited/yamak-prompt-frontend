import React from 'react';
import { IoListCircleOutline } from 'react-icons/io5';
import { BsClock, BsCircle } from 'react-icons/bs';
import Draft from './drafts';
import { Workspace } from 'utils/constants';
import { Button, Input, Timeline } from 'components/common';

// later these will come from API

const items = [
  {
    dot: <BsClock style={{ fontSize: '12px', color: 'gray' }} />,
    children: 'Current Draft',
    className: 'font-bold text-primary',
  },
  {
    dot: <BsClock style={{ fontSize: '12px', color: 'gray' }} />,
    children: 'Other saved Drafts',
    className: 'font-bold',
  },
  {
    dot: <BsCircle style={{ fontSize: '8px', color: 'gray' }} />,
    children: <Draft />,
  },
  {
    dot: <BsCircle style={{ fontSize: '8px', color: 'gray' }} />,
    children: <Draft />,
  },
  {
    dot: <BsCircle style={{ fontSize: '8px', color: 'gray' }} />,
    children: <Draft />,
  },
  {
    dot: <BsCircle style={{ fontSize: '8px', color: 'gray' }} />,
    children: <Draft />,
  },
  {
    dot: <BsCircle style={{ fontSize: '8px', color: 'gray' }} />,
    children: <Draft />,
  },
  {
    dot: <BsCircle style={{ fontSize: '8px', color: 'gray' }} />,
    children: <Draft />,
  },
  {
    dot: <BsCircle style={{ fontSize: '8px', color: 'gray' }} />,
    children: <Draft />,
  },
];
const handleChange = () => {};
const handleClick = () => {};

const index: React.FC = () => {
  return (
    <div className="flex flex-col pl-4 h-full">
      <div className="flex justify-between items-center font-poppins h-1/6">
        <h1 className="font-bold text-base">{Workspace.History}</h1>
        <IoListCircleOutline size={25} />
      </div>
      <Input
        id={Workspace.SearchLibrary}
        name={Workspace.SearchLibrary}
        placeholder={Workspace.SearchLibrary}
        type={Workspace.Search}
        className="bg-gray50 px-3 py-2 my-4"
        onChange={handleChange}
      />
      <div className="flex flex-col h-5/6">
        <Timeline
          items={items}
          className="pt-2 font-poppins overflow-y-scroll pr-2 h-5/6"
        />
        <div className="flex justify-between h-1/6 pt-4">
          <Button
            size={undefined}
            type={'default'}
            shape={undefined}
            onClick={handleClick}
            name={Workspace.ShowBookmarked}
            className="border-black text-black border-2 rounded-xl"
          />
          <Button
            size={undefined}
            type={'default'}
            shape={undefined}
            onClick={handleClick}
            name={Workspace.ShowPublished}
            className="border-gray200 text-gray200 border-2 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default index;
