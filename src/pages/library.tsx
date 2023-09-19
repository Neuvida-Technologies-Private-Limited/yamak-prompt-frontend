import { LibraryCardsGrid, LibraryHeader } from 'components/helpers';
import HeadingArea from 'components/helpers/library/header/HeadingArea';
import SearchArea from 'components/helpers/library/header/SearchArea';
import { Tabs } from 'components/common';
import { CardConst } from 'utils/constants';
import { HiMenu, HiOutlineHeart } from 'react-icons/hi';
import { useState } from 'react';
import { Library as LibraryConstants } from 'utils/constants';

// Using this data to render cards only, This will come from API
const cardItems = [
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
  const [items, setItems] = useState(cardItems);

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
        />
        <SearchArea />
      </LibraryHeader>
      <LibraryCardsGrid items={items} />
    </div>
  );
};

export default Library;
