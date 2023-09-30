import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'components/common';
import { BsThreeDots } from 'react-icons/bs';
import { Workspace } from 'utils/constants';
import type { MenuProps } from 'antd';

interface WorkspaceCardProps {
  heading: string;
  createdBy: string;
  createdOn: string;
  last_edited: string;
  link: string;
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <button onClick={() => {}}>Edit</button>,
  },
  {
    key: '2',
    label: <button onClick={() => {}}>Delete</button>,
  },
];

const index: React.FC<WorkspaceCardProps> = ({
  heading,
  createdOn,
  createdBy,
  last_edited,
  link,
}) => {
  return (
    <div className="font-poppins p-4 bg-white rounded-lg flex flex-col justify-between gap-6 hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-start h-full py-2">
        <div className="flex items-center gap-1 h-full">
          <div className="w-1.5 bg-secondary rounded-xl h-12" />
          <div className="flex flex-col h-full px-2">
            <Link to={link}>
              <h1 className="font-bold text-base md:text-lg text-black hover:text-primary">
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
        <div className="flex justify-between sm:flex-col md:flex-row">
          <p className="pl-1">{createdBy}</p>
          <p className="">
            <b>{Workspace.LastEdited}</b> {last_edited}
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
