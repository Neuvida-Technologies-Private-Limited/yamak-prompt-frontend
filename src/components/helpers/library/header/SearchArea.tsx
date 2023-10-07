import { useState, useEffect } from 'react';

import { message } from 'antd';

import { Input } from 'components/common';
import { Library, InputVariants } from 'utils/constants';
import { useRecoilState } from 'recoil';
import { libraryPaginationState } from 'middleware/state/library';

const SearchArea: React.FC<{ onSearchPrompt: (input: string) => void }> = ({
  onSearchPrompt,
}) => {
  const [input, setInput] = useState('');
  const [pagination, setPagination] = useRecoilState(libraryPaginationState);

  useEffect(() => {
    async function getData() {
      try {
        setPagination(old => ({ ...old, query: input }));
        onSearchPrompt(input);
      } catch (err: any) {
        message.error(err.message);
      }
    }

    getData();
  }, [onSearchPrompt, input, setPagination]);

  return (
    <div className="flex sm:flex-col md:flex-row md:w-1/2 justify-between items-start px-6 pt-4 sm:pb-4 md:pb-2">
      <Input
        id={Library.SearchLibrary}
        name={Library.SearchLibrary}
        placeholder={Library.SearchLibrary}
        value={input}
        onChange={setInput}
        type="search"
        variant={InputVariants.Filled}
      />
    </div>
  );
};

export default SearchArea;
