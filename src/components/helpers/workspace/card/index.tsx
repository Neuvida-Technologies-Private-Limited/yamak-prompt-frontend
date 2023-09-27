import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'components/common';
import { BsThreeDots } from 'react-icons/bs';
import type { MenuProps } from 'antd';

interface WorkspaceCardProps {
  heading: string;
  createdBy: string;
  createdOn: string;
  link: string;
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <button onClick={() => console.log('EDIT')}>Edit</button>,
  },
  {
    key: '2',
    label: <button onClick={() => console.log('DELETE')}>Delete</button>,
  },
];

const index: React.FC<WorkspaceCardProps> = ({
  heading,
  createdOn,
  createdBy,
  link,
}) => {
  return (
    <div className="font-poppins p-4 bg-white rounded-lg flex flex-col justify-between gap-6 hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-start h-full py-2">
        <div className="flex h-full">
          <div className="w-1.5 bg-secondary rounded-xl h-12" />
          <div className="flex flex-col h-full px-2">
            <Link to={link}>
              <h1 className="text-bold text-lg text-black hover:text-primary">
                {heading}
              </h1>
            </Link>
            <h3 className="text-gray500 font-light">{createdOn}</h3>
          </div>
        </div>
        <Dropdown items={items}>
          <BsThreeDots size={24} />
        </Dropdown>
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
