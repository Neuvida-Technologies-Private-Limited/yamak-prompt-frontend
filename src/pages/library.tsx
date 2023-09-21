import { useEffect, useState } from 'react';
import { HiMenu, HiOutlineHeart } from 'react-icons/hi';
import {
  LibraryCardsGrid,
  LibraryHeader,
  HeadingArea,
  TabsArea,
  SearchArea,
} from 'components/helpers';
import { LibraryCardItems } from 'utils/constants';
import { Tabs } from 'components/common';
import { LibraryCardItem as CardItem } from 'types';

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
    setItems(LibraryCardItems);
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
