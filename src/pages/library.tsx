import { useCallback } from 'react';

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

  const handlePaginationState = useCallback(
    function (count: number, hasNext: null, hasPrevious: null) {
      setPaginationState(old => ({
        ...old,
        count,
        hasNext,
        hasPrevious,
      }));
    },
    [setPaginationState]
  );

  function handleTabClick(tabId: string) {
    setState(old => ({ ...old, activeTab: tabId }));
  }

  const getPrompts = useCallback(
    async function (currentPage: number) {
      try {
        const res = await getAllPrompts(currentPage);
        handlePaginationState(res.data.count, res.data.next, res.data.previous);
        setState(old => ({ ...old, items: res.data.results }));
      } catch (err: any) {
        message.error(err.message);
      }
    },
    [handlePaginationState, setState]
  );

  async function addPromptHandler(prompt: string) {
    try {
      const res = await createPrompt(prompt);
      await getPrompts(pagination.currentPage);
      return res;
    } catch (err: any) {
      console.log(err);
      message.error(err.message);
    }
  }

  const searchPromptHandler = useCallback(
    async function (input: string) {
      try {
        if (input.length === 0) {
          await getPrompts(pagination.currentPage);
          return;
        }

        if (items.length === 0) return;

        const res = await getSearchPromptInfo(pagination.currentPage, input);
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
    [
      setPaginationState,
      setState,
      getPrompts,
      pagination.currentPage,
      items.length,
    ]
  );

  async function deletePromptHandler(id: string) {
    try {
      const res = await deletePrompt(id);

      if (pagination.count === 1) {
        await getPrompts(pagination.currentPage);
        return;
      }

      if (pagination.currentPage < pagination.totalPages) {
        await getPrompts(pagination.currentPage);
        return;
      }

      if (pagination.count % pagination.itemsPerPage === 1) {
        setPaginationState(old => ({
          ...old,
          currentPage: pagination.currentPage - 1,
        }));
        await getPrompts(pagination.currentPage - 1);
        return;
      }

      await getPrompts(pagination.currentPage);
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
      await getPrompts(pagination.currentPage);
      return res;
    } catch (err: any) {
      message.error(err.message);
    }
  };

  // useEffect(() => {
  //   getPrompts(pagination.currentPage);
  // }, [getPrompts, pagination.currentPage]);

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
