import { useRecoilState } from 'recoil';

import { Button } from '..';
import { ButtonVariants } from 'utils/constants';
import {
  libraryPaginationState,
  libraryFavouritePaginationState,
  libraryState,
} from 'middleware/state/library';
import { keyPaginationState } from 'middleware/state';
import { workspacePaginationState } from 'middleware/state';

interface PaginationProps {
  type: 'library' | 'workspace' | 'key-management';
}

const Pagination: React.FC<PaginationProps> = ({ type }) => {
  const [{ activeTab }] = useRecoilState(libraryState);

  let state;

  switch (type) {
    case 'library':
      state =
        activeTab === '1'
          ? libraryPaginationState
          : libraryFavouritePaginationState;
      break;

    case 'key-management':
      state = keyPaginationState;
      break;

    case 'workspace':
      state = workspacePaginationState;
      break;
  }

  const [{ currentPage, hasPrevious, hasNext, totalPages }, setState] =
    useRecoilState(state);

  const totalButtons = Array.from({ length: totalPages }).map((_, index) => (
    <Button
      key={index}
      variant={ButtonVariants.OUTLINED_LIGHT}
      disabled={currentPage === index + 1}
      name={index + 1}
      onClick={() => setState(old => ({ ...old, currentPage: index + 1 }))}
    />
  ));

  function nextPageHandler() {
    setState(old => ({ ...old, currentPage: currentPage + 1 }));
  }

  function previousPageHandler() {
    setState(old => ({ ...old, currentPage: currentPage - 1 }));
  }

  return (
    <div className="flex gap-4 self-center py-4">
      <Button
        disabled={hasPrevious ? false : true}
        variant={ButtonVariants.OUTLINED_LIGHT}
        name={'Previous'}
        onClick={previousPageHandler}
      />
      {totalButtons}
      <Button
        disabled={hasNext ? false : true}
        variant={ButtonVariants.OUTLINED_LIGHT}
        name={'Next'}
        onClick={nextPageHandler}
      />
    </div>
  );
};

export default Pagination;
