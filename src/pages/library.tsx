import { useCallback, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { HiMenu, HiOutlineHeart } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { message } from 'antd';

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
      } catch (err: any) {
        message.error(err.message);
      }
    },
    [setState]
  );

  async function addPromptHandler(prompt: string) {
    try {
      const res = await createPrompt(prompt);
      await getPrompts();
      return res;
    } catch (err: any) {
      message.error(err.message);
    }
  }

  async function deletePromptHandler(id: string) {
    try {
      const res = await deletePrompt(id);
      await getPrompts();
      return res;
    } catch (err: any) {
      message.error(err.message);
    }
  }

  async function getPromptInfoHandler(id: string) {
    try {
      return await getPromptInfo(id);
    } catch (err: any) {
      message.error(err.message);
    }
  }

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
    if (activeTab === '2') {
      const data = items.filter(item => item.favourite);
      setState(old => ({ ...old, filteredItems: data }));
      return;
    }
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
        <SearchArea />
      </LibraryHeader>
      <PaginatedItems
        items={activeTab === '1' ? items : filteredItems}
        itemsPerPage={Pagination.itemsPerPage}
        onAddPrompt={addPromptHandler}
        onDeletePrompt={deletePromptHandler}
        onPromptInfo={getPromptInfoHandler}
        onUpdatePrompt={updatePromptHandler}
      />
      <ToastContainer />
    </div>
  );
};

export default Library;
