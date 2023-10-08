import { useRecoilState } from 'recoil';
import { Button } from '..';
import { libraryPaginationState } from 'middleware/state/library';
import { ButtonVariants } from 'utils/constants';

function Pagination() {
  const [{ currentPage, hasPrevious, hasNext, count, itemsPerPage }, setState] =
    useRecoilState(libraryPaginationState);

  const totalKeys = Math.ceil(count / itemsPerPage);

  const totalButtons = Array.from({ length: totalKeys }).map((_, index) => (
    <Button
      key={index}
      variant="outlined-light"
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
}

export default Pagination;
