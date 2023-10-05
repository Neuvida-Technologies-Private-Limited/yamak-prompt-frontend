import React, { useState } from 'react';
import { message, type MenuProps } from 'antd';
import { BsThreeDots } from 'react-icons/bs';
import { useResetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

import { Dropdown, Modal } from 'components/common';
import { Workspace } from 'utils/constants';
import { generateOutputState } from 'middleware/state';

interface WorkspaceCardProps {
  heading: string;
  createdBy: string;
  createdOn: string;
  last_edited: string;
  id: string;
  deleteWorkspace: (id: string) => Promise<boolean | undefined>;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  id,
  heading,
  createdOn,
  createdBy,
  last_edited,
  deleteWorkspace,
}) => {
  const resetOutputState = useResetRecoilState(generateOutputState);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteWorkspace = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();

    try {
      if (await deleteWorkspace(id)) {
        setShowModal(false);
        message.success('Workspace deleted !');
      }
    } catch (error: any) {
      message.error('Error in deleting workspace!');
    }
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <button onClick={() => {}}>Edit</button>,
    },
    {
      key: '2',
      label: <button onClick={() => setShowModal(true)}>Delete</button>,
    },
  ];

  return (
    <div className="font-poppins p-4 bg-white rounded-lg flex flex-col justify-between gap-6 hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-start h-full py-2">
        <div className="flex items-center gap-1 h-full">
          <div className="w-1.5 bg-secondary rounded-xl h-12" />
          <div className="flex flex-col h-full px-2">
            <Link to={`/home/workspace/${id}`} onClick={resetOutputState}>
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
      <Modal
        title={'Do you want to delete this workspace?'}
        centered={true}
        isOpen={showModal}
        sumbitHandler={handleDeleteWorkspace}
        cancelModalHandler={() => {
          setShowModal(false);
        }}
        okText={'Yes'}
        cancelText="No"
        className="keyManagement"
      />
    </div>
  );
};

export default WorkspaceCard;
