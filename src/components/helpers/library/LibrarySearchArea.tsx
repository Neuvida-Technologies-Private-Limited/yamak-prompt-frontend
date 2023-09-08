import { Input, Select } from 'components/common';
import { Library } from 'utils/enums';
import { LibrarySelectOptions } from 'utils/contants';

const LibrarySearchArea = () => {
  const searchLibraryHandler = (data: string) => {};

  return (
    <div className="flex sm:flex-col md:flex-row justify-between items-start px-6 pt-4 sm:pb-4 md:pb-2">
      <Input
        id={Library.SearchLibrary}
        name={Library.SearchLibrary}
        className="p-2 px-3 sm:w-full md:w-2/4 bg-gray50 mb-4"
        placeholder={Library.SearchLibrary}
        onChange={searchLibraryHandler}
      />
      <Select
        options={LibrarySelectOptions}
        placeholder={Library.SelectTopicPlaceholder}
        className="sm:w-full md:w-auto"
      />
    </div>
  );
};

export default LibrarySearchArea;
