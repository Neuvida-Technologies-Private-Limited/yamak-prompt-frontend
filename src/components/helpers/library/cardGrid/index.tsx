import LibraryCard from './card';

type CardItems = {
  id: number;
  heading: string;
  subHeading: string;
  buttonName: string;
  description: string;
  favorite?: boolean;
};

const CardsGrid: React.FC<{ items: CardItems[] }> = ({ items }) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 font-poppins bg-gray50">
      {items.map((item, index) => (
        <LibraryCard
          key={`library-card-item-${index}`}
          heading={item.heading}
          subHeading={item.subHeading}
          buttonName={item.buttonName}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default CardsGrid;
