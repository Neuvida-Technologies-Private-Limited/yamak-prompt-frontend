import { Button } from 'components/common';
import { useState } from 'react';
import { HiMenu, HiOutlineHeart } from 'react-icons/hi';

const LibraryCardFilter = () => {
  const [isAllSelected, setIsAllSelected] = useState(true);

  const filterHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsAllSelected(event.currentTarget.textContent === 'All' ? true : false);
  };

  return (
    <div className="flex py-4 px-6 border-b-2 border-primary50">
      <div className="flex bg-slate-50 rounded-2xl p-2">
        <Button
          size="small"
          type="default"
          shape="default"
          onClick={filterHandler}
          className={`${
            isAllSelected && 'bg-white'
          } rounded-2xl font-bold !py-4 !px-3 border-0`}
          name="All"
          icon={<HiMenu />}
        />
        <Button
          size="small"
          type="default"
          shape="default"
          onClick={filterHandler}
          className={`${
            !isAllSelected && 'bg-white'
          } font-bold rounded-2xl !py-4 !px-3 border-0`}
          name="Favorites"
          icon={<HiOutlineHeart />}
        />
      </div>
    </div>
  );
};

export default LibraryCardFilter;
