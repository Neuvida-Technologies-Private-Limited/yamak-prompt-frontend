import React, { useCallback, useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { message } from 'antd';

import { KeyHeader, KeysGrid } from 'components/helpers';
import { createKey, deleteKey, getKeyList } from 'middleware/api';
import {
  createKeystate,
  keyManagementState,
  keyPaginationState,
} from 'middleware/state';

const KeyManagment: React.FC = () => {
  const [, setState] = useRecoilState(keyManagementState);
  const [createKeystates] = useRecoilState(createKeystate);
  const { title, description, api_key, provider } = createKeystates;
  const [pagination, setPaginationState] = useRecoilState(keyPaginationState);

  const createKeyHandler = async () => {
    const keyManagementParams = {
      title,
      description,
      api_key,
      provider,
    };

    try {
      await createKey(keyManagementParams);
      await getKeys(pagination.currentPage);
      message.success('Key created successfully');
      return true;
    } catch (error: any) {
      const errorMessage = error.error;
      message.error(errorMessage);
      return false;
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
      await deleteKey(uuid);

      if (pagination.count === 1) {
        await getKeys(pagination.currentPage);
        return true;
      }

      if (pagination.currentPage < pagination.totalPages) {
        await getKeys(pagination.currentPage);
        return true;
      }

      if (pagination.count % pagination.itemsPerPage === 1) {
        setPaginationState(old => ({
          ...old,
          currentPage: pagination.currentPage - 1,
        }));
        await getKeys(pagination.currentPage - 1);
        return true;
      }

      await getKeys(pagination.currentPage);
      return true;
    } catch (error) {
      console.log(error);
      message.error('Key cannot be deleted, please login again !');
      return false;
    }
  }

  useEffect(() => {
    getKeys(pagination.currentPage);
  }, [getKeys, pagination.currentPage]);

  return (
    <div className="flex flex-col gap-5 font-poppins p-6 h-screen overflow-y-scroll">
      <KeyHeader onCreateKey={createKeyHandler} />
      <KeysGrid onDeleteKey={deleteKeyHandler} />
    </div>
  );
};

export default KeyManagment;
