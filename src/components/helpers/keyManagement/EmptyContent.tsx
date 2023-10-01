import { Heading, Text } from 'components/common';

const EmptyContent = () => {
  return (
    <div className="bg-gray50 w-full h-full flex flex-col items-center gap-4 py-20">
      <img src="/assets/images/empty_key.svg" alt="No prompt found" />
      <div className="flex flex-col items-center px-10 text-center">
        <Heading level={4}>
          Click on the "Add New Key" button to get started
        </Heading>
        <Text children="feature allows you to create a unique API key that will enable you to access ai platforms advanced machine learning functionalities." />
      </div>
    </div>
  );
};

export default EmptyContent;
