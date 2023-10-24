import { useState, useEffect } from 'react';

import { Input } from 'components/common';
import { Library, InputVariants, ButtonVariants } from 'utils/constants';
import { useRecoilState } from 'recoil';
import {
  libraryFavouritePaginationState,
  libraryPaginationState,
  libraryState,
} from 'middleware/state/library';
import { Button } from 'components/common';

const SearchArea: React.FC<{ onSearchPrompt: (input: string) => void }> = ({
  onSearchPrompt,
}) => {
  const [input, setInput] = useState('');
  const [library] = useRecoilState(libraryState);
  const [, setPagination] = useRecoilState(
    library.activeTab === '1'
      ? libraryPaginationState
      : libraryFavouritePaginationState
  );

  function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();

    if (input.length === 0) return;

    setPagination(old => ({ ...old, query: input, currentPage: 1 }));
    onSearchPrompt(input);
  }

  useEffect(() => {
    if (input === '') {
      setPagination(old => ({ ...old, query: '' }));
    }
  }, [setPagination, input]);

  useEffect(() => {
    setInput('');
  }, [library.activeTab]);

  return (
    <div className="md:flex-row md:w-1/2 justify-between items-start p-6">
      <form onSubmit={formSubmitHandler} className="flex gap-2">
        <Input
          id={Library.SEARCH_LIBRARY}
          name={Library.SEARCH_LIBRARY}
          placeholder={
            library.items.length === 0
              ? Library.NO_SEARCH_LIBRARY
              : Library.SEARCH_LIBRARY
          }
          value={input}
          onChange={setInput}
          type="search"
          variant={InputVariants.Filled}
        />
        <Button
          variant={ButtonVariants.PRIMARY_LIGHT}
          name="Search"
          htmlType="submit"
        />
      </form>
    </div>
  );
};

export default SearchArea;
