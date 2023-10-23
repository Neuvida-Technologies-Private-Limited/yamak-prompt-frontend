import { Button, Input } from 'components/common';
import React, { useState } from 'react';
import { KeyManagement, ButtonVariants, InputVariants } from 'utils/constants';

const SearchArea = () => {
  const [input, setInput] = useState('');

  function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div className="md:flex-row md:w-1/2 justify-between items-start p-6">
      <form onSubmit={formSubmitHandler} className="flex gap-2">
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
