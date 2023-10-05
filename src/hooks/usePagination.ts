import { useState } from 'react';
import { LibraryCardItem } from 'types';

const usePagination = (
  items: LibraryCardItem[],
  itemsPerPage: number
): [LibraryCardItem[], number, (event: any) => void] => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return [currentItems, pageCount, handlePageClick];
};

export default usePagination;
