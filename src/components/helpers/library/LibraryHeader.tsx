import {
  LibraryCardFilter,
  LibraryHeadingArea,
  LibrarySearchArea,
} from 'components/helpers';

const LibraryHeader = () => {
  return (
    <div className="shadow">
      <LibraryHeadingArea />
      <LibraryCardFilter />
      <LibrarySearchArea />
    </div>
  );
};

export default LibraryHeader;
