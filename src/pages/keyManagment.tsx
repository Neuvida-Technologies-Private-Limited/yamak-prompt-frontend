import React, { useCallback, useEffect, useState } from 'react';

import { FiTrash2 } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { message } from 'antd';

import { Heading, Pagination, PopupConfirm } from 'components/common';
import { Button, Text } from 'components/common';
import { CreateKeyModal, EmptyKeyManagement } from 'components/helpers';
import { KeyManagement, ButtonVariants } from 'utils/constants';
import { createKey, deleteKey, getKeyList } from 'middleware/api';
import { createKeystate, keyManagementState } from 'middleware/state';
import { paginationState } from 'middleware/state/pagination';

const KeyManagment: React.FC = () => {
  const [state, setState] = useRecoilState(keyManagementState);
  const [createKeystates] = useRecoilState(createKeystate);
  // destructuring params
  const { title, description, api_key, provider } = createKeystates;
  const { results } = state;

  const [pagination, setPaginationState] = useRecoilState(paginationState);

  const [showPopupConfirm, setShowPopupConfirm] = useState<Array<boolean>>(
    results.length > 0 ? results.map(() => false) : []
  );

  const createKeyHandler = async () => {
    const keyManagementParams = {
      title,
      description,
      api_key,
      provider,
    };

    try {
      await createKey(keyManagementParams);
      await getKeyList(pagination.currentPage);
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
      } catch (error: any) {
        console.log(error);
        message.error(error);
      }
    },
    [setState, setPaginationState, pagination.count, pagination.itemsPerPage]
  );

  const handlePopupConfirmOpen = (index: number, open: boolean) => {
    const updatedVisibility = [...showPopupConfirm];
    updatedVisibility[index] = open;
    setShowPopupConfirm(updatedVisibility);
  };

  async function deleteKeyHandler(uuid: string) {
    try {
      await deleteKey(uuid);

      if (pagination.count === 1) {
        await getKeyList(pagination.currentPage);
        return true;
      }

      if (pagination.count % pagination.itemsPerPage === 1) {
        setPaginationState(old => ({
          ...old,
          currentPage: pagination.currentPage - 1,
        }));
        await getKeyList(pagination.currentPage - 1);
        return true;
      }

      await getKeyList(pagination.currentPage);
      return true;
    } catch (error) {
      console.log(error);
      message.error('Key cannot be deleted, please login again !');
      return false;
    }
  }

  useEffect(() => {
    getKeyList(pagination.currentPage);
  }, [getKeys, pagination.currentPage]);

  return (
    <div className="flex flex-col gap-5 font-poppins p-6 h-screen overflow-y-scroll">
      <div className="flex sm:flex-col lg:flex-row justify-between items-start md:items-start mb-5 gap-3">
        <div>
          <Heading level={2} children="Key management" />
          <Text
            children={KeyManagement.MESSAGE}
            className="text-sm md:text-base lg:w-3/4 font-normal text-gray400"
          />
        </div>
        <CreateKeyModal createKey={createKeyHandler} />
      </div>

      {results.length === 0 ? (
        <EmptyKeyManagement />
      ) : (
        <>
          <div className="flex flex-col gap-y-10">
            {results.map((item, index) => (
              <div
                key={`key-management-input-${index}`}
                className="w-full flex sm:flex-col md:flex-row sm:items-start md:items-end gap-4 w-full"
              >
                <div className="flex flex-col sm:w-full md:w-2/3">
                  <h2 className="text-base md:text-xl text-primary900 font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-gray400 md:text-base pb-3">
                    {item.description}
                  </p>
                  <div className="flex sm:gap-2 md:gap-8 md:items-center sm:flex-col md:flex-row mt-2">
                    <div className="flex flex-col font-poppins rounded-lg p-1 bg-primary50 h-full md:w-2/3 sm:w-full border border-gray200">
                      <label className="font-medium px-2 mx-2 -mt-4 bg-white w-fit rounded-md border border-gray200 text-primary900">
                        {item.provider}
                      </label>
                      <label className="p-2 text-gray900 text-base truncate">
                        {item.api_key}
                      </label>
                    </div>
                    <PopupConfirm
                      item={
                        <Button
                          key={index}
                          variant={ButtonVariants.OUTLINED}
                          onClick={() => {
                            handlePopupConfirmOpen(index, true);
                          }}
                          name={KeyManagement.DELETE}
                          icon={<FiTrash2 />}
                        />
                      }
                      isOpen={showPopupConfirm[index]}
                      handlePopupConfirm={open =>
                        handlePopupConfirmOpen(index, open)
                      }
                      onConfirm={() => deleteKeyHandler(item.uuid)}
                      title={KeyManagement.POPUP_TITLE}
                      description={KeyManagement.POPUP_DESCRIPTION}
                      placement="top"
                      successMessage={KeyManagement.SUCCESS}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {pagination.totalPages >= 2 ? <Pagination /> : null}
        </>
      )}
    </div>
  );
};

export default KeyManagment;
