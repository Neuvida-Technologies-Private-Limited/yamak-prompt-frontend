import React from 'react';
import { ButtonVariants } from 'utils/constants';
import { Button } from 'components/common';
import { KeyManagement } from 'utils/constants';
import { FiTrash2 } from 'react-icons/fi';

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
  return (
    <div className="w-full flex sm:flex-col md:flex-row sm:items-start md:items-end gap-4 w-full">
      <div className="flex flex-col sm:w-full md:w-2/3">
        <h2 className="text-base md:text-xl text-primary900 font-semibold">
          {title}
        </h2>
        <p className="text-gray400 md:text-base pb-3">{description}</p>
        <div className="flex sm:gap-2 md:gap-8 md:items-center sm:flex-col md:flex-row mt-2">
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
            onClick={() => {
              window.confirm('Are you sure?') && onDeleteKey(uuid);
            }}
            name={KeyManagement.DELETE}
            icon={<FiTrash2 />}
          />
        </div>
      </div>
    </div>
  );
};

export default KeyItem;
