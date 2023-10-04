import { message } from 'antd';
import { Input } from 'components/common';
import { getSearchPromptInfo } from 'middleware/api';
import { useEffect, useState } from 'react';
import { Library, InputVariants } from 'utils/constants';

const SearchArea: React.FC<{
  onSearchPrompt: (input: string, res: any) => void;
}> = ({ onSearchPrompt }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const res = await getSearchPromptInfo(input);
        onSearchPrompt(input, res);
      } catch (err: any) {
        message.error(err.message);
      }
    }
    getData();
  }, [input, onSearchPrompt]);

  return (
    <div className="flex sm:flex-col md:flex-row justify-between items-start px-6 pt-4 sm:pb-4 md:pb-2">
      <Input
        id={Library.SearchLibrary}
        name={Library.SearchLibrary}
        className="md:w-1/2"
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
