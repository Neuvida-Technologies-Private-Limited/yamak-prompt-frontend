import { Button } from 'components/common';
import { HiMenu, HiOutlineHeart } from 'react-icons/hi';

const LibraryCardFilter = () => {
  const addPromptHandler = () => {};

  return (
    <div className="flex py-4 px-6 border-b-2 border-primary50">
      <div className="flex bg-slate-50 rounded-2xl p-2">
        <Button
          size="small"
          type="default"
          shape="default"
          onClick={addPromptHandler}
          className="bg-white rounded-2xl font-bold !py-4 !px-3 border-0"
          name="All"
          icon={<HiMenu />}
        />
        <Button
          size="small"
          type="default"
          shape="default"
          onClick={addPromptHandler}
          className="font-bold rounded-2xl !py-4 !px-3 border-0"
          name="favorites"
          icon={<HiOutlineHeart />}
        />
      </div>
    </div>
  );
};

export default LibraryCardFilter;
