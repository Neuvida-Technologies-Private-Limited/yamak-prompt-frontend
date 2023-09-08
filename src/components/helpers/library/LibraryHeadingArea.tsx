import { Button, Heading, Text } from 'components/common';

const LibraryHeadingArea = () => {
  const addPromptHandler: React.MouseEventHandler = () => {};
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
      <Button
        size="small"
        type="default"
        shape="default"
        onClick={addPromptHandler}
        className="bg-primary text-white hover:!text-white border-none !py-5 !px-3 hover:bg-primary700"
        name="Add Prompt"
      />
    </div>
  );
};

export default LibraryHeadingArea;
