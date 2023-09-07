import React from 'react';
import { Heading, StyledInput } from 'components/common';
import { Button, Text } from 'components/common';
import { CreateKeyModal } from 'components/helpers';
import { RiSaveLine, RiDeleteBin5Line } from 'react-icons/ri';
import { KeyManagement } from 'utils/constants';

const inputs = [
  { name: 'Open AI', placeHolder: 'sk-*************************' },
  { name: 'Bard', placeHolder: 'sk-*************************' },
];

const keyManagment: React.FC = () => {
  const saveManagementHandler = () => {};
  const deleteManagementHandler = () => {};

  return (
    <div className="font-poppins p-6">
      <div className="flex sm:flex-col md:flex-row justify-between sm:items-start md:items-center mb-5 gap-3">
        <Heading variant="mainHeading" children="Key management" className="" />
        <CreateKeyModal />
      </div>
      <Text
        children={KeyManagement.Message}
        className="text-sm md:text-base sm:w-full md:w-3/4 "
      />

      <div className="mt-14 flex flex-col gap-y-10">
        {inputs.map((input, index) => (
          <div
            key={`key-management-input-${index}`}
            className="w-full flex sm:flex-col md:flex-row sm:items-start md:items-center gap-4"
          >
            <StyledInput
              label={input.name}
              placeholder={input.placeHolder}
              className="sm:w-full md:w-2/4"
            />
            <div className="flex gap-x-2">
              <Button
                size="small"
                type="default"
                shape="default"
                onClick={saveManagementHandler}
                className="font-poppins !py-4"
                name="Save"
                icon={<RiSaveLine />}
              />
              <Button
                size="small"
                type="default"
                shape="default"
                onClick={deleteManagementHandler}
                className="font-poppins !py-4"
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
