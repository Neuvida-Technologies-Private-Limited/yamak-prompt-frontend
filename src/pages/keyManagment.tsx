import React, { useCallback, useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { message } from 'antd';

import {
  KeyHeader as Header,
  KeyHeadingArea as HeadingArea,
  KeySearchArea as SearchArea,
  KeysGrid as Grid,
} from 'components/helpers';
import { createKey, deleteKey, getKeyList } from 'middleware/api';
import { keyManagementState, keyPaginationState } from 'middleware/state';
import { CreateKeyModal } from 'middleware/api/types';
import { ITEMS_PER_PAGE } from 'utils/constants';

const KeyManagment: React.FC = () => {
  const [, setState] = useRecoilState(keyManagementState);
  const [pagination, setPaginationState] = useRecoilState(keyPaginationState);

  const createKeyHandler = async (key: CreateKeyModal) => {
    try {
      const res = await createKey(key);
      await getKeys(pagination.currentPage);
      return res;
    } catch (err: any) {
      message.error(err.error);
    }
  };

  const getKeys = useCallback(
    async function (currentPage: number) {
      try {
        const res = await getKeyList(currentPage);
        setPaginationState(old => ({
          ...old,
          count: res.count,
          hasNext: res.next,
          hasPrevious: res.previous,
          totalPages: Math.ceil(pagination.count / pagination.itemsPerPage),
        }));
        setState(old => ({
          ...old,
          results: res.results,
        }));
      } catch (err: any) {
        message.error(err.message);
      }
    },
    [setState, setPaginationState, pagination.count, pagination.itemsPerPage]
  );

  async function deleteKeyHandler(uuid: string) {
    try {
      const res = await deleteKey(uuid);

      if (pagination.count === 1) {
        await getKeys(pagination.currentPage);
        return res;
      }

      if (pagination.currentPage < pagination.totalPages) {
        await getKeys(pagination.currentPage);
        return res;
      }

      if (pagination.count % pagination.itemsPerPage === 1) {
        setPaginationState(old => ({
          ...old,
          currentPage: pagination.currentPage - 1,
        }));
        await getKeys(pagination.currentPage - 1);
        return res;
      }

      await getKeys(pagination.currentPage);
      return res;
    } catch (error) {
      console.log(error);
      message.error('Key cannot be deleted, please login again !');
      return false;
    }
  }

  // const searchKeyHandler = useCallback(
  //   async function (input: string) {
  //     try {
  //       const res = await getSearchKeys(
  //         pagination.currentPage,
  //         input
  //       );

  //       setState(old => ({ ...old, items: res.data.results }))

  //       setPaginationState(old => ({
  //         ...old,
  //         count: res.data.count,
  //         hasNext: res.data.next,
  //         hasPrevious: res.data.previous,
  //         totalPages: Math.ceil(res.data.count / ITEMS_PER_PAGE),
  //       }));
  //     } catch (err: any) {}
  //   },
  //   [
  //     setPaginationState,
  //     setState,
  //     pagination.currentPage,
  //   ]
  // );

  useEffect(() => {
    getKeys(pagination.currentPage);
  }, [getKeys, pagination.currentPage]);

  return (
    <div className="flex flex-col font-poppins">
      <Header>
        <HeadingArea onCreateKey={createKeyHandler} />
        <SearchArea />
      </Header>
      <Grid onDeleteKey={deleteKeyHandler} />
    </div>
  );
};

export default KeyManagment;
