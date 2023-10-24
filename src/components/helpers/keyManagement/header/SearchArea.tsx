import React, { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { Button, Input, Select } from 'components/common';
import { keyPaginationState } from 'middleware/state';
import {
  KeyManagement,
  ButtonVariants,
  InputVariants,
  ItemsPerPageOptions,
} from 'utils/constants';

interface SearchAreaProps {
  onSearchKey: (input: string) => void;
}

const SearchArea: React.FC<SearchAreaProps> = ({ onSearchKey }) => {
  const [input, setInput] = useState('');
  const [{ itemsPerPage }, setPagination] = useRecoilState(keyPaginationState);

  function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();

    if (input.length === 0) return;

    setPagination(old => ({ ...old, query: input, currentPage: 1 }));
    onSearchKey(input);
  }

  function itemsPerPageChangeHandler(value: string) {
    setPagination(old => ({
      ...old,
      currentPage: 1,
      itemsPerPage: Number(value),
    }));
  }

  useEffect(() => {
    if (input === '') {
      setPagination(old => ({ ...old, query: '' }));
    }
  }, [setPagination, input]);

  return (
    <div className="flex justify-between items-center p-6 border-b-2 border-gray50">
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

      <div className="flex items-center gap-2">
        <label className="text-gray900">Items</label>
        <Select
          onChange={itemsPerPageChangeHandler}
          value={String(itemsPerPage)}
          options={ItemsPerPageOptions}
        />
      </div>
    </div>
  );
};

export default SearchArea;
