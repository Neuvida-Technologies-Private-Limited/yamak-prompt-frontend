import { Heading, Text } from 'components/common';
import AddNewPrompt from './AddNewPrompt';
import { Library } from 'utils/contants';

const LibraryHeadingArea = () => {
  return (
    <div className="flex sm:flex-col md:flex-row sm:items-start md:justify-between  gap-4 border-b-2 border-primary50 py-6 px-6">
      <div>
        <Heading
          variant="mainHeading"
          children={Library.Heading}
          className="mb-2"
        />
        <Text children={Library.SubHeading} className="text-sm md:text-base" />
      </div>
      <AddNewPrompt />
    </div>
  );
};

export default LibraryHeadingArea;
