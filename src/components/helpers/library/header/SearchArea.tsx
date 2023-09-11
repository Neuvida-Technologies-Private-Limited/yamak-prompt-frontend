import { Input, Select } from 'components/common';
import { LibrarySelectOptions, Library } from 'utils/constants';

const SearchArea = () => {
  const searchLibraryHandler = (data: string) => {};

  return (
    <div className="flex sm:flex-col md:flex-row justify-between items-start px-6 pt-4 sm:pb-4 md:pb-2">
      <Input
        id={Library.SearchLibrary}
        name={Library.SearchLibrary}
        className="p-2 px-3 sm:w-full md:w-2/4 bg-gray50 mb-4"
        placeholder={Library.SearchLibrary}
        onChange={searchLibraryHandler}
        type="search"
      />
      <Select
        options={LibrarySelectOptions}
        placeholder={Library.SelectTopicPlaceholder}
        className="sm:w-full md:w-auto"
      />
    </div>
  );
};

export default SearchArea;
