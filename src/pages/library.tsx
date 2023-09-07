import React from 'react';
import { Button, Heading, Input, Select, Text } from 'components/common';
import { HiMenu, HiOutlineHeart } from 'react-icons/hi';

const library: React.FC = () => {
  const addPromptHandler = () => {};
  const searchLibraryHandler = () => {};

  return (
    <div className="font-poppins">
      <div id="header" className="shadow">
        <div className="flex sm:flex-col md:flex-row sm:items-start md:justify-between  gap-4 border-b-2 border-primary50 py-6 px-6">
          <div>
            <Heading
              variant="mainHeading"
              children={'Library/Repository'}
              className="mb-2"
            />
            <Text
              children="Browse and Choose from our Prompt Library"
              className="text-sm md:text-base"
            />
          </div>
          <Button
            size="small"
            type="default"
            shape="default"
            onClick={addPromptHandler}
            className="bg-primary text-white hover:!text-white border-none !py-5 !px-3 hover:bg-primary700"
            name="Add Prompt"
          />
        </div>
        <div className="flex py-4 px-6 border-b-2 border-primary50">
          <div className="flex bg-slate-50 rounded-2xl p-2">
            <Button
              size="small"
              type="default"
              shape="default"
              onClick={addPromptHandler}
              className="bg-white rounded-2xl font-bold !py-4 !px-3 border-0"
              name="All"
              icon={<HiMenu />}
            />
            <Button
              size="small"
              type="default"
              shape="default"
              onClick={addPromptHandler}
              className="font-bold rounded-2xl !py-4 !px-3 border-0"
              name="favorites"
              icon={<HiOutlineHeart />}
            />
          </div>
        </div>
        <div className="flex sm:flex-col md:flex-row justify-between items-start px-6 pt-4 sm:pb-4 md:pb-2">
          <Input
            id={'search-library'}
            name={'search-library'}
            className="p-2 px-3 sm:w-full md:w-2/4 bg-gray50 mb-4"
            placeholder={'Search Library'}
            onChange={searchLibraryHandler}
          />
          <Select
            options={[
              { value: 'copywriting', label: 'Copywriting' },
              { value: 'devops', label: 'Devops' },
              { value: 'generate-ai', label: 'Generate AI' },
            ]}
            placeholder="Select Topic"
            style={{ width: 130 }}
          />
        </div>
      </div>
      <div className="p-6">Library cards</div>
    </div>
  );
};

export default library;
