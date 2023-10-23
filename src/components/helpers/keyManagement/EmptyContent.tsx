import { Text } from 'components/common';
import { KeyManagement, TextVariants } from 'utils/constants';

const EmptyContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-4 py-20">
      <img src="/assets/images/empty_key.svg" alt="No prompt found" />
      <div className="flex flex-col items-center px-10 text-center">
        <Text
          variant={TextVariants.MEDIUM}
          children={KeyManagement.EMPTY_SCREEN_MESSAGE}
        />
      </div>
    </div>
  );
};

export default EmptyContent;
