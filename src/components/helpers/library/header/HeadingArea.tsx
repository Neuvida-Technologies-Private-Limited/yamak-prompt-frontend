import { Heading, Text } from 'components/common';
import AddNewPrompt from '../addPrompt';
import { Library } from 'utils/constants';

const HeadingArea = () => {
  return (
    <div className="flex sm:flex-col md:flex-row sm:items-start md:justify-between gap-4 border-b-2 border-gray50 py-6 px-6">
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

export default HeadingArea;
