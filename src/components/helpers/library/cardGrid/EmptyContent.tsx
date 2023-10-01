import { Heading, Text } from 'components/common';
import AddNewPrompt from '../addPrompt';

const EmptyContent = () => {
  return (
    <div className="bg-gray50 w-full flex flex-col items-center gap-4 py-20">
      <img src="/assets/images/library.svg" alt="No prompt found" />
      <div className="flex flex-col items-center px-10 text-center">
        <Heading level={4}>Oops, it's a bit empty in here...</Heading>
        <Text children="Not sure where to start? Browse our library of pre-built templates to get the inspiration flowing." />
      </div>
      <AddNewPrompt />
    </div>
  );
};

export default EmptyContent;
