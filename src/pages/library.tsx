import { LibraryCardsGrid, LibraryHeader } from 'components/helpers';
import HeadingArea from 'components/helpers/library/header/HeadingArea';
import SearchArea from 'components/helpers/library/header/SearchArea';
import { Tabs } from 'components/common';
import { CardConst } from 'utils/constants';
import { HiMenu, HiOutlineHeart } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Library as LibraryConstants } from 'utils/constants';

// NOTE: Using this data to render cards only, This will come from API
type CardItem = {
  id: number;
  heading: string;
  subHeading: string;
  buttonName: string;
  description: string;
  favorite?: boolean;
};

const cardItems: CardItem[] = [
  {
    id: 1,
    heading: LibraryConstants.CardHeading,
    subHeading: LibraryConstants.CardSubHeading,
    buttonName: LibraryConstants.CardButtonName,
    description: LibraryConstants.CardDescription,
    favorite: true,
  },
  {
    id: 2,
    heading: LibraryConstants.CardHeading,
    subHeading: LibraryConstants.CardSubHeading,
    buttonName: LibraryConstants.CardButtonName,
    description: LibraryConstants.CardDescription,
    favorite: true,
  },
  {
    id: 3,
    heading: LibraryConstants.CardHeading,
    subHeading: LibraryConstants.CardSubHeading,
    buttonName: LibraryConstants.CardButtonName,
    description: LibraryConstants.CardDescription,
    favorite: true,
  },
  {
    id: 4,
    heading: LibraryConstants.CardHeading,
    subHeading: LibraryConstants.CardSubHeading,
    buttonName: LibraryConstants.CardButtonName,
    description: LibraryConstants.CardDescription,
  },
  {
    id: 5,
    heading: LibraryConstants.CardHeading,
    subHeading: LibraryConstants.CardSubHeading,
    buttonName: LibraryConstants.CardButtonName,
    description: LibraryConstants.CardDescription,
  },
  {
    id: 6,
    heading: LibraryConstants.CardHeading,
    subHeading: LibraryConstants.CardSubHeading,
    buttonName: LibraryConstants.CardButtonName,
    description: LibraryConstants.CardDescription,
  },
  {
    id: 7,
    heading: LibraryConstants.CardHeading,
    subHeading: LibraryConstants.CardSubHeading,
    buttonName: LibraryConstants.CardButtonName,
    description: LibraryConstants.CardDescription,
    favorite: true,
  },
  {
    id: 8,
    heading: LibraryConstants.CardHeading,
    subHeading: LibraryConstants.CardSubHeading,
    buttonName: LibraryConstants.CardButtonName,
    description: LibraryConstants.CardDescription,
  },
];

const Library = () => {
  const [items, setItems] = useState<CardItem[]>();
  const [filteredItems, setFilteredItems] = useState<CardItem[]>(cardItems);

  function favoriteHandler(isSelected: boolean) {
    console.log(isSelected);
    if (isSelected === false) return setFilteredItems(items!);
    const data = items!.filter(item => item.favorite === isSelected);
    setFilteredItems(data);
  }

  useEffect(() => {
    // NOTE: Here we will call the API and set the items
    setItems(cardItems);
  }, []);

  return (
    <div className="font-poppins h-screen overflow-y-scroll">
      <LibraryHeader>
        <HeadingArea />
        <Tabs
          tab1={CardConst.All}
          tab2={CardConst.Favourite}
          icon1={<HiMenu />}
          icon2={<HiOutlineHeart />}
          className="border-b-2 border-gray50 py-4 px-6"
          onTabsHandler={favoriteHandler}
        />
        <SearchArea />
      </LibraryHeader>
      <LibraryCardsGrid items={filteredItems} />
    </div>
  );
};

export default Library;
