import { LibraryCardsGrid } from 'components/helpers';
import { usePagination } from 'hooks';
import ReactPaginate from 'react-paginate';
import { LibraryCardItem } from 'types';

interface PaginatedItemsProps {
  itemsPerPage: number;
  children?: React.ReactNode | any;
  items: LibraryCardItem[];
  onDeletePrompt: (id: string) => {};
  onPromptInfo: (id: string) => unknown;
  onUpdatePrompt: (update: any, id: string) => void;
}

const PaginatedItems: React.FC<PaginatedItemsProps> = ({
  items,
  onDeletePrompt,
  onPromptInfo,
  onUpdatePrompt,
  itemsPerPage,
  children,
}) => {
  const [currentItems, pageCount, handlePageClick] = usePagination(
    items,
    itemsPerPage
  );

  return (
    <>
      <LibraryCardsGrid
        items={currentItems}
        onDeletePrompt={onDeletePrompt}
        onPromptInfo={onPromptInfo}
        onUpdatePrompt={onUpdatePrompt}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginatedItems;
