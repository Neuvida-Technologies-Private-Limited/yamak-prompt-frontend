import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { message } from 'antd';

import { Input } from 'components/common';
import { getAllPrompts, getSearchPromptInfo } from 'middleware/api';
import { libraryState } from 'middleware/state/library';
import { Library, InputVariants } from 'utils/constants';

const SearchArea = () => {
  const [input, setInput] = useState('');
  const [_, setState] = useRecoilState(libraryState);

  useEffect(() => {
    async function getData() {
      try {
        const res: any = await getSearchPromptInfo(input);

        if (res.status_code !== 200) throw new Error(res.error);

        setState(old => ({ ...old, items: res.data.results }));

        if (input.length === 0) {
          const res = await getAllPrompts();

          if (res.status_code !== 200) throw new Error(res.error);

          setState(old => ({ ...old, items: res.data.results }));
          return;
        }
      } catch (err: any) {
        message.error(err.message);
      }
    }

    if (input.length < 2 && input.length !== 0) return;

    getData();
  }, [input, setState]);

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
