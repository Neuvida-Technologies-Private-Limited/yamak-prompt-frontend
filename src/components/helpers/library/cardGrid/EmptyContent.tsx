import { Heading, Text } from 'components/common';
import AddNewPrompt from '../addPrompt';
import { Library } from 'utils/constants';

const EmptyContent = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 py-20">
      <img src="/assets/images/library.svg" alt="No prompt found" />
      <div className="flex flex-col items-center px-10 text-center">
        <Heading level={4}>{Library.EmptyLibraryHeading}</Heading>
        <Text children={Library.EmptyLibraryText} />
      </div>
      <AddNewPrompt />
    </div>
  );
};

export default EmptyContent;
