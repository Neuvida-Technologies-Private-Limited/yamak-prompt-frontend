import { Input, Select } from 'components/common';

const LibrarySearchArea = () => {
  const searchLibraryHandler = (data: string) => {};

  return (
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
        className="sm:w-full md:w-auto"
      />
    </div>
  );
};

export default LibrarySearchArea;
