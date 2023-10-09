import { useRecoilState } from 'recoil';
import { Button } from '..';
import { ButtonVariants } from 'utils/constants';
import { paginationState } from 'middleware/state/pagination';

function Pagination() {
  const [{ currentPage, hasPrevious, hasNext, totalPages }, setState] =
    useRecoilState(paginationState);

  const totalButtons = Array.from({ length: totalPages }).map((_, index) => (
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
