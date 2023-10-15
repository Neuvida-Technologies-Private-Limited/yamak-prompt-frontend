import React, { useState } from 'react';

import { message } from 'antd';
import { FiTrash2 } from 'react-icons/fi';

import { ButtonVariants } from 'utils/constants';
import { Button, Modal } from 'components/common';
import { KeyManagement } from 'utils/constants';

interface KeyItemProps {
  uuid: string;
  title: string;
  description: string;
  provider: string;
  api_key: string;
  onDeleteKey: (uuid: string) => Promise<boolean>;
}

const KeyItem: React.FC<KeyItemProps> = ({
  uuid,
  title,
  description,
  provider,
  api_key,
  onDeleteKey,
}) => {
  const [deleteModal, showDeleteModal] = useState(false);

  async function keyDeleteHandler() {
    await onDeleteKey(uuid);
    message.success('Key deleted successfully');
    showDeleteModal(false);
  }

  return (
    <div className="w-full flex sm:flex-col md:flex-row sm:items-start md:items-end gap-4 w-full">
      <div className="flex flex-col sm:w-full md:w-2/3">
        <h2 className="text-base md:text-xl text-primary900 font-semibold">
          {title}
        </h2>
        <p className="text-gray400 sm:text-md md:text-base pb-3">
          {description}
        </p>
        <div className="flex sm:gap-2 md:gap-8 sm:flex-col sm:items-start md:flex-row md:items-center   mt-2">
          <div className="flex flex-col font-poppins rounded-lg p-1 bg-primary50 h-full md:w-2/3 sm:w-full border border-gray200">
            <label className="font-medium px-2 mx-2 -mt-4 bg-white w-fit rounded-md border border-gray200 text-primary900">
              {provider}
            </label>
            <label className="p-2 text-gray900 text-base truncate">
              {api_key}
            </label>
          </div>
          <Button
            variant={ButtonVariants.OUTLINED}
            onClick={() => showDeleteModal(true)}
            name={KeyManagement.DELETE}
            icon={<FiTrash2 />}
          />
          <Modal
            title={'Are you sure you want to delete this key?'}
            centered={true}
            isOpen={deleteModal}
            sumbitHandler={keyDeleteHandler}
            cancelModalHandler={() => {
              showDeleteModal(false);
            }}
            okText={'Yes'}
            cancelText="No"
            closeIcon={false}
          />
        </div>
      </div>
    </div>
  );
};

export default KeyItem;
