import { useEffect, useState } from 'react';
import { HiMenu, HiOutlineHeart } from 'react-icons/hi';
import {
  LibraryCardsGrid,
  LibraryHeader,
  HeadingArea,
  TabsArea,
  SearchArea,
} from 'components/helpers';
import { Tabs } from 'components/common';
import { LibraryCardItem as CardItem } from 'types';
import { getAllPrompts } from 'middleware/api/library-api';

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
    async function getPrompts() {
      try {
        const res = await getAllPrompts();
        setItems(res.data.results);
      } catch (err) {}
    }

    getPrompts();
  }, []);

  useEffect(() => {
    if (activeTab === '1') return setFilteredItems(items);
    const data = items.filter(item => item.bookmarked);
    setFilteredItems(data);
  }, [activeTab, items]);

  return (
    <div className="library font-poppins h-screen overflow-y-scroll">
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
