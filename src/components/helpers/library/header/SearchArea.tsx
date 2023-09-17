import { Input, Select } from 'components/common';
import { LibrarySelectOptions, Library, InputVariants } from 'utils/constants';

const SearchArea = () => {
  const searchLibraryHandler = (data: string) => {};

  return (
    <div className="flex sm:flex-col md:flex-row justify-between items-start px-6 pt-4 sm:pb-4 md:pb-2">
      <Input
        id={Library.SearchLibrary}
        name={Library.SearchLibrary}
        className="md:w-1/2"
        placeholder={Library.SearchLibrary}
        onChange={searchLibraryHandler}
        type="search"
        variant={InputVariants.Filled}
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
