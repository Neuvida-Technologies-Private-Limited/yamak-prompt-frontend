import { useRecoilState } from 'recoil';

import { Button } from '..';
import { ButtonVariants } from 'utils/constants';
import {
  libraryPaginationState,
  libraryFavouritePaginationState,
  libraryState,
} from 'middleware/state/library';
import {
  keyPaginationState,
  workspaceHistoryPaginationState,
} from 'middleware/state';
import { workspacePaginationState } from 'middleware/state';

interface PaginationProps {
  type: 'library' | 'workspace' | 'key-management' | 'workspace-history';
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

    case 'workspace-history':
      state = workspaceHistoryPaginationState;
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
    if (currentPage === totalPages) return;
    setState(old => ({ ...old, currentPage: currentPage + 1 }));
  }

  function previousPageHandler() {
    if (currentPage - 1 === 0) return;
    setState(old => ({ ...old, currentPage: currentPage - 1 }));
  }

  return (
    <div className="flex gap-2 self-center py-4">
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
