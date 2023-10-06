import { useState } from 'react';

import { Input } from 'components/common';
import { Library, InputVariants } from 'utils/constants';

const SearchArea: React.FC<{ onSearchPrompt: (input: string) => void }> = ({
  onSearchPrompt,
}) => {
  const [input, setInput] = useState('');

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       onSearchPrompt(input);
  //     } catch (err: any) {
  //       message.error(err.message);
  //     }
  //   }

  //   if (input.length < 3) return;

  //   getData();
  // }, [onSearchPrompt, input]);

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
