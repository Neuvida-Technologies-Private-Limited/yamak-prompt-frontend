import { useCallback, useEffect, useState } from 'react';
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
import {
  createPrompt,
  deletePrompt,
  getAllPrompts,
  getPromptInfo,
  updatePromptInfo,
} from 'middleware/api/library-api';
import { ToastContainer, toast } from 'react-toastify';
import { PromptModal } from 'middleware/api/types';

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

  function handleTabClick(tabId: string) {
    setActiveTab(tabId);
  }

  async function getPrompts() {
    try {
      const res = await getAllPrompts();
      setItems(res.data.results);
    } catch (err) {}
  }

  async function addPromptHandler(prompt: PromptModal) {
    try {
      await createPrompt(prompt);
      getPrompts();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function deletePromptHandler(id: string) {
    try {
      await deletePrompt(id);
      getPrompts();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function promptInfoHandler(id: string) {
    try {
      return await getPromptInfo(id);
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  const searchPromptHandler = useCallback(async function (
    input: string,
    res: any
  ) {
    const { results } = res.data;
    setItems(results);
    if (input === '') await getPrompts();
  }, []);

  const updatePromptHandler = async function (update: any, id: string) {
    try {
      const res = await updatePromptInfo(update, id);
      await getPrompts();
      console.log(res);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getPrompts();
  }, []);

  useEffect(() => {
    if (activeTab === '1') return setFilteredItems(items);
    const data = items.filter(item => item.bookmarked);
    setFilteredItems(data);
  }, [activeTab, items]);

  return (
    <div className="library font-poppins h-screen">
      <LibraryHeader>
        <HeadingArea onAddPrompt={addPromptHandler} />
        <TabsArea>
          <Tabs
            tabs={tabs}
            currentTab={activeTab}
            onTabClick={handleTabClick}
          />
        </TabsArea>
        <SearchArea onSearchPrompt={searchPromptHandler} />
      </LibraryHeader>
      <LibraryCardsGrid
        items={filteredItems}
        onDeletePrompt={deletePromptHandler}
        onPromptInfo={promptInfoHandler}
        onUpdatePrompt={updatePromptHandler}
      />
      <ToastContainer />
    </div>
  );
};

export default Library;
