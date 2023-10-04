import { useCallback, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { HiMenu, HiOutlineHeart } from 'react-icons/hi';
import { useRecoilState } from 'recoil';

import {
  LibraryHeader,
  HeadingArea,
  TabsArea,
  SearchArea,
  PaginatedItems,
} from 'components/helpers';
import { Tabs } from 'components/common';
import {
  createPrompt,
  deletePrompt,
  getAllPrompts,
  getPromptInfo,
  updatePromptInfo,
} from 'middleware/api/library-api';
import { Pagination } from 'utils/constants';
import { libraryState } from 'middleware/state/library';
import { message } from 'antd';

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
  const [state, setState] = useRecoilState(libraryState);
  const { items, filteredItems, activeTab } = state;

  function handleTabClick(tabId: string) {
    setState(old => ({ ...old, activeTab: tabId }));
  }

  const getPrompts = useCallback(
    async function () {
      try {
        const res = await getAllPrompts();
        setState(old => ({ ...old, items: res.data.results }));
      } catch (err) {}
    },
    [setState]
  );

  async function addPromptHandler(prompt: string) {
    try {
      const res = await createPrompt(prompt);
      getPrompts();
      return res;
    } catch (err: any) {
      message.error(err.message);
    }
  }

  async function deletePromptHandler(id: string) {
    try {
      const res = await deletePrompt(id);
      getPrompts();
      return res;
    } catch (err: any) {
      message.error(err.message);
    }
  }

  async function promptInfoHandler(id: string) {
    try {
      return await getPromptInfo(id);
    } catch (err: any) {
      message.error(err.message);
    }
  }

  const searchPromptHandler = useCallback(
    async function (input: string, res: any) {
      const { results } = res.data;
      setState(old => ({ ...old, items: results }));
      if (input === '') await getPrompts();
    },
    [getPrompts, setState]
  );

  const updatePromptHandler = async function (update: any, id: string) {
    try {
      const res = await updatePromptInfo(update, id);
      await getPrompts();
      return res;
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getPrompts();
  }, [getPrompts]);

  useEffect(() => {
    if (activeTab === '2') {
      const data = items.filter(item => item.bookmarked);
      setState(old => ({ ...old, filteredItems: data }));
      return;
    }
    setState(old => ({ ...old, items }));
  }, [activeTab, items, setState]);

  return (
    <div className="library font-poppins h-full">
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
      <PaginatedItems
        items={activeTab === '1' ? items : filteredItems}
        itemsPerPage={Pagination.itemsPerPage}
        onAddPrompt={addPromptHandler}
        onDeletePrompt={deletePromptHandler}
        onPromptInfo={promptInfoHandler}
        onUpdatePrompt={updatePromptHandler}
      />
      <ToastContainer />
    </div>
  );
};

export default Library;
