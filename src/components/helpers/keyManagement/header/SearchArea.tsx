import { Button, Input } from 'components/common';
import { keyPaginationState } from 'middleware/state';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { KeyManagement, ButtonVariants, InputVariants } from 'utils/constants';

interface SearchAreaProps {
  onSearchKey: (input: string) => void;
}

const SearchArea: React.FC<SearchAreaProps> = ({ onSearchKey }) => {
  const [input, setInput] = useState('');
  const [, setPagination] = useRecoilState(keyPaginationState);

  function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();

    if (input.length === 0) return;

    setPagination(old => ({ ...old, query: input, currentPage: 1 }));
    onSearchKey(input);
  }

  useEffect(() => {
    if (input === '') {
      setPagination(old => ({ ...old, query: '' }));
    }
  }, [setPagination, input]);

  return (
    <div className=" p-6 border-b-2 border-gray50">
      <form
        onSubmit={formSubmitHandler}
        className="flex md:flex-row md:w-1/2 justify-between items-start gap-2"
      >
        <Input
          id={KeyManagement.KEY_SEARCH_TITLE}
          name={KeyManagement.KEY_SEARCH_TITLE}
          placeholder={KeyManagement.KEY_SEARCH_PLACEHOLDER}
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
