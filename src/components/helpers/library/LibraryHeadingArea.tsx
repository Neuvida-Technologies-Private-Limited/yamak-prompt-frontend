import { Heading, Text } from 'components/common';
import AddNewPrompt from './AddNewPrompt';

const LibraryHeadingArea = () => {
  return (
    <div className="flex sm:flex-col md:flex-row sm:items-start md:justify-between  gap-4 border-b-2 border-primary50 py-6 px-6">
      <div>
        <Heading
          variant="mainHeading"
          children={'Library/Repository'}
          className="mb-2"
        />
        <Text
          children="Browse and Choose from our Prompt Library"
          className="text-sm md:text-base"
        />
      </div>
      <AddNewPrompt />
    </div>
  );
};

export default LibraryHeadingArea;
