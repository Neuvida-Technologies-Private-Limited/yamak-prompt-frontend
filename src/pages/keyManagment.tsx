import React from 'react';
import { RiSaveLine, RiDeleteBin5Line } from 'react-icons/ri';
import { Heading, Input } from 'components/common';
import { Button, Text } from 'components/common';
import { CreateKeyModal } from 'components/helpers';
import { KeyManagement, KeyManagementInputs } from 'utils/constants';

const keyManagment: React.FC = () => {
  const deleteManagementHandler = () => {};
  const handleChange = () => {};

  return (
    <div className="font-poppins p-6">
      <div className="flex sm:flex-col lg:flex-row justify-between items-start md:items-start mb-5 gap-3">
        <div>
          <Heading
            variant="mainHeading"
            children="Key management"
            className="mb-2"
          />
          <Text
            children={KeyManagement.Message}
            className="text-sm md:text-base lg:w-3/4"
          />
        </div>
        <CreateKeyModal />
      </div>

      <div className="mt-14 flex flex-col gap-y-10">
        {KeyManagementInputs.map((input, index) => (
          <div
            key={`key-management-input-${index}`}
            className="w-full flex sm:flex-col md:flex-row sm:items-start md:items-center gap-4 w-full"
          >
            <div className="flex flex-col font-poppins rounded-lg bg-gray50 p-2 h-full md:w-2/3 sm:w-full">
              <label className="font-medium px-2 mx-2 -mt-4 bg-white w-fit">
                {input.name}
              </label>
              <Input
                id={input.id}
                name={input.placeHolder}
                placeholder={input.placeHolder}
                onChange={handleChange}
                variant={'default'}
                className="pt-2 px-4 bg-gray50"
              />
            </div>
            <div className="flex gap-x-2">
              <Button
                size="small"
                type="default"
                shape="default"
                onClick={deleteManagementHandler}
                className="font-poppins !py-4 border-2 border-black"
                name="Delete"
                icon={<RiDeleteBin5Line />}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default keyManagment;
