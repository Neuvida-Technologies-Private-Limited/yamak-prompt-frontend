import { useCallback, useEffect } from 'react';

import { HiMenu, HiOutlineHeart } from 'react-icons/hi';
import { useRecoilState, useResetRecoilState } from 'recoil';
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
  getAllFavouritePrompts,
  getAllPrompts,
  getPromptInfo,
  getSearchPromptInfo,
  updatePromptInfo,
} from 'middleware/api/library-api';
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
  const resetPaginationState = useResetRecoilState(libraryPaginationState);

  function handleTabClick(tabId: string) {
    setState(old => ({ ...old, activeTab: tabId }));
  }

  const getPrompts = useCallback(
    async function (currentPage: number) {
      try {
        const res = await getAllPrompts(currentPage);
        setPaginationState(old => ({
          ...old,
          count: res.data.count,
          hasNext: res.data.next,
          hasPrevious: res.data.previous,
          totalPages: Math.ceil(pagination.count / pagination.itemsPerPage),
        }));
        setState(old => ({ ...old, items: res.data.results }));
      } catch (err: any) {
        message.error(err.message);
      }
    },
    [setState, pagination.count, pagination.itemsPerPage, setPaginationState]
  );

  const getFavouritePrompts = useCallback(
    async function (currentPage: number) {
      try {
        const res = await getAllFavouritePrompts(currentPage);

        setPaginationState(old => ({
          ...old,
          count: res.data.count,
          hasNext: res.data.next,
          hasPrevious: res.data.previous,
          totalPages: Math.ceil(pagination.count / pagination.itemsPerPage),
        }));

        setState(old => ({ ...old, filteredItems: res.data.results }));
      } catch (err: any) {}
    },
    [setState, setPaginationState, pagination.count, pagination.itemsPerPage]
  );

  async function addPromptHandler(prompt: string) {
    try {
      const res = await createPrompt(prompt);
      await getPrompts(pagination.currentPage);
      return res;
    } catch (err: any) {
      message.error(err.message);
    }
  }

  const searchPromptHandler = useCallback(
    async function (input: string) {
      try {
        // getting prompts data on load
        if (input.length === 0) {
          activeTab === '1'
            ? await getPrompts(pagination.currentPage)
            : await getFavouritePrompts(pagination.currentPage);

          return;
        }

        if (items.length === 0 && activeTab === '1') return;
        if (filteredItems.length === 0 && activeTab === '2') return;

        const res = await getSearchPromptInfo(
          pagination.currentPage,
          input,
          activeTab === '2'
        );

        setPaginationState(old => ({
          ...old,
          count: res.data.count,
          hasNext: res.data.next,
          hasPrevious: res.data.previous,
          totalPages: Math.ceil(pagination.count / pagination.itemsPerPage),
        }));

        activeTab === '1'
          ? setState(old => ({ ...old, items: res.data.results }))
          : setState(old => ({ ...old, filteredItems: res.data.results }));
      } catch (err: any) {
        message.error(err.message);
      }
    },
    [
      setPaginationState,
      setState,
      getPrompts,
      getFavouritePrompts,
      pagination.currentPage,
      items.length,
      filteredItems.length,
      activeTab,
      pagination.count,
      pagination.itemsPerPage,
    ]
  );

  async function deletePromptHandler(id: string) {
    try {
      const res = await deletePrompt(id);

      if (pagination.count === 1) {
        activeTab === '1'
          ? await getPrompts(pagination.currentPage)
          : await getFavouritePrompts(pagination.currentPage);
        return;
      }

      if (pagination.currentPage < pagination.totalPages) {
        activeTab === '1'
          ? await getPrompts(pagination.currentPage)
          : await getFavouritePrompts(pagination.currentPage);
        return;
      }

      if (pagination.count % pagination.itemsPerPage === 1) {
        setPaginationState(old => ({
          ...old,
          currentPage: pagination.currentPage - 1,
        }));
        activeTab === '1'
          ? await getPrompts(pagination.currentPage - 1)
          : await getFavouritePrompts(pagination.currentPage - 1);
        return;
      }

      activeTab === '1'
        ? await getPrompts(pagination.currentPage)
        : await getFavouritePrompts(pagination.currentPage);
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
      activeTab === '1'
        ? await getPrompts(pagination.currentPage)
        : await getFavouritePrompts(pagination.currentPage);
      return res;
    } catch (err: any) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    setPaginationState(old => ({ ...old, currentPage: 1 }));
  }, [activeTab, setPaginationState]);

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
    </div>
  );
};

export default Library;
