import LibraryCard from './Card';
import { Library } from 'utils/contants';

const LibraryCardsGrid = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 p-6 font-poppins bg-gray50">
      {Array.from(Array(10)).map((_, index) => (
        <LibraryCard
          key={`library-card-item-${index}`}
          heading={Library.CardHeading}
          subHeading={Library.CardSubHeading}
          buttonName={Library.CardButtonName}
          description={Library.CardDescription}
        />
      ))}
    </div>
  );
};

export default LibraryCardsGrid;
