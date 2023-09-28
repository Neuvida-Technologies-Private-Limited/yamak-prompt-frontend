import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiTrash2 } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { Heading, PopupConfirm } from 'components/common';
import { Button, Text } from 'components/common';
import { CreateKeyModal } from 'components/helpers';
import { KeyManagement } from 'utils/constants';
import { CreateKey, DeleteKey, GetKeyList } from 'middleware/api';
import { createKeystate, keyManagementstate } from 'middleware/state';

const KeyManagment: React.FC = () => {
  const [state, setState] = useRecoilState(keyManagementstate);
  const [createKeystates, setcreateKeystate] = useRecoilState(createKeystate);
  // destructuring params
  const { title, description, api_key, provider } = createKeystates;
  const { key_details } = state;

  const [showPopupConfirm, setShowPopupConfirm] = useState<Array<boolean>>(
    key_details.length > 0 ? key_details.map(() => false) : []
  );

  const createKey = async () => {
    const keyManagementParams = {
      title,
      description,
      api_key,
      provider,
    };

    try {
      await CreateKey(keyManagementParams);
      getKeyList();
      toast.success('Key created successfully');
      return true;
    } catch (error: any) {
      const errorMessage = error.error;
      toast.error(errorMessage);
      return false;
    }
  };

  const getKeyList = async () => {
    try {
      const res = await GetKeyList();
      setState(old => ({
        ...old,
        key_details: res,
      }));
    } catch (error: any) {
      console.log(error);
    }
  };

  const handlePopupConfirmOpen = (index: number, open: boolean) => {
    const updatedVisibility = [...showPopupConfirm];
    updatedVisibility[index] = open;
    setShowPopupConfirm(updatedVisibility);
  };

  const deleteKey = async (uuid: string | undefined) => {
    try {
      if (uuid) {
        await DeleteKey(uuid);
        getKeyList();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKeyList();
  }, []);

  return (
    <div className="font-poppins p-6 h-screen overflow-hidden">
      <div className="flex sm:flex-col lg:flex-row justify-between items-start md:items-start mb-5 gap-3">
        <div>
          <Heading
            variant="mainHeading"
            children="Key management"
            className="mb-2"
          />
          <Text
            children={KeyManagement.MESSAGE}
            className="text-sm md:text-base lg:w-3/4 font-normal text-gray400"
          />
        </div>
        <CreateKeyModal createKey={createKey} />
      </div>

      {key_details.length === 0 ? (
        <p className="text-gray400 text-center">No key</p>
      ) : (
        <div className="mt-10 flex flex-col gap-y-10 md:overflow-y-scroll h-full">
          {key_details.map((item, index) => (
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
                <div className="flex sm:gap-2 md:gap-8 md:items-center sm:flex-col md:flex-row">
                  <div className="flex flex-col font-poppins rounded-lg bg-primary50 p-2 h-full md:w-2/3 sm:w-full border border-gray200">
                    <label className="font-medium px-2 mx-2 -mt-4 bg-white w-fit rounded-md border border-gray200 text-primary900">
                      {item.provider}
                    </label>
                    <label className="p-2 text-gray900 text-base">
                      {item.api_key}
                    </label>
                  </div>
                  <PopupConfirm
                    item={
                      <Button
                        key={index}
                        size="small"
                        variant="outlined"
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
                    onConfirm={() => deleteKey(item.uuid)}
                    title={KeyManagement.POPUP_TITLE}
                    description={KeyManagement.POPUP_DESCRIPTION}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default KeyManagment;
