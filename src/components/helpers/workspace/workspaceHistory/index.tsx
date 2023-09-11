import React from 'react';
import { IoListCircleOutline } from 'react-icons/io5';
import { BsClock, BsCircle } from 'react-icons/bs';
import Draft from './drafts';
import { Workspace } from 'utils/constants';
import { Timeline } from 'components/common';

const items = [
  {
    dot: <BsClock style={{ fontSize: '12px', color: 'gray' }} />,
    children: 'Current Draft',
  },
  {
    dot: <BsClock style={{ fontSize: '12px', color: 'gray' }} />,
    children: 'Other saved Drafts',
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

const index: React.FC = () => {
  return (
    <div className="flex flex-col pl-4">
      <div className="flex justify-between items-center font-poppins">
        <h1 className="font-bold text-base">{Workspace.History}</h1>
        <IoListCircleOutline size={25} />
      </div>
      <Timeline items={items} className="pt-2 font-poppins" />
    </div>
  );
};

export default index;
