import { useEffect, useState } from 'react';
import { LibraryCardsGrid, LibraryHeader } from 'components/helpers';
import { HiMenu, HiOutlineHeart } from 'react-icons/hi';
import { Library as LibraryConstants } from 'utils/constants';
import { Tabs } from 'components/common';
import HeadingArea from 'components/helpers/library/header/HeadingArea';
import SearchArea from 'components/helpers/library/header/SearchArea';
import TabsArea from 'components/helpers/library/header/TabsArea';

type CardItem = {
  id: number;
  heading: string;
  subHeading: string;
  buttonName: string;
  description: string;
  favorite?: boolean;
};

// NOTE: Using this data to render cards only, This will come from API
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

const tabs = [
  {
    id: '1',
    tabTitle: 'All',
    icon: <HiMenu />,
  },
  {
    id: '2',
    tabTitle: 'Favorite',
    icon: <HiOutlineHeart />,
  },
];

const Library = () => {
  const [items, setItems] = useState<CardItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<CardItem[]>([]);
  const [activeTab, setActiveTab] = useState('1');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    // NOTE: Here we will call the API and set the items
    setItems(cardItems);
  }, []);

  useEffect(() => {
    if (activeTab === '1') return setFilteredItems(items);
    const data = items.filter(item => item.favorite);
    setFilteredItems(data);
  }, [activeTab, items]);

  return (
    <div className="font-poppins h-screen overflow-y-scroll">
      <LibraryHeader>
        <HeadingArea />
        <TabsArea>
          <Tabs
            tabs={tabs}
            currentTab={activeTab}
            onTabClick={handleTabClick}
          />
        </TabsArea>
        <SearchArea />
      </LibraryHeader>
      <LibraryCardsGrid items={filteredItems} />
    </div>
  );
};

export default Library;
