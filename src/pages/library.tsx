import { LibraryCardsGrid, LibraryHeader } from 'components/helpers';

const library = () => {
  return (
    <div className="font-poppins h-screen overflow-y-scroll">
      <LibraryHeader />
      <LibraryCardsGrid />
    </div>
  );
};

export default library;
