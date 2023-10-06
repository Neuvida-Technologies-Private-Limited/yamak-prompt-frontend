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
  LibraryCardsGrid,
} from 'components/helpers';
import { Tabs } from 'components/common';
import {
  createPrompt,
  deletePrompt,
  getAllPrompts,
  getPromptInfo,
  getSearchPromptInfo,
  updatePromptInfo,
} from 'middleware/api/library-api';
import { Pagination } from 'components/common';
import { libraryPaginationState, libraryState } from 'middleware/state/library';

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
  const [pagination, setPaginationState] = useRecoilState(
    libraryPaginationState
  );

  function handleTabClick(tabId: string) {
    setState(old => ({ ...old, activeTab: tabId }));
  }

  const getPrompts = useCallback(
    async function () {
      try {
        const res = await getAllPrompts(pagination.currentPage);
        setState(old => ({ ...old, items: res.data.results }));
        setPaginationState(old => ({
          ...old,
          count: res.data.count,
          hasNext: res.data.next,
          hasPrevious: res.data.previous,
        }));
      } catch (err: any) {
        message.error(err.message);
      }
    },
    [pagination.currentPage, setState, setPaginationState]
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

  const searchPromptHandler = useCallback(
    async function (input: string) {
      try {
        const res = await getSearchPromptInfo(input);
        setPaginationState(old => ({
          ...old,
          count: res.data.count,
          hasNext: res.data.next,
          hasPrevious: res.data.previous,
        }));
        setState(old => ({ ...old, items: res.data.results }));
      } catch (err: any) {
        message.error(err.message);
      }
    },
    [setPaginationState, setState]
  );

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
    getPrompts();
  }, [getPrompts]);

  return (
    <div className="flex flex-col font-poppins">
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
        items={activeTab === '1' ? items : filteredItems}
        onAddPrompt={addPromptHandler}
        onDeletePrompt={deletePromptHandler}
        onPromptInfo={getPromptInfoHandler}
        onUpdatePrompt={updatePromptHandler}
      />
      <Pagination />
      <ToastContainer />
    </div>
  );
};

export default Library;
