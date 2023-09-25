import React, { useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Heading } from 'components/common';
import { Button, Text } from 'components/common';
import { CreateKeyModal } from 'components/helpers';
import { KeyManagement, KeyDetails } from 'utils/constants';
import { GetKeyList } from 'middleware/api';
import { useRecoilState } from 'recoil';
import { keyManagementstate } from 'middleware/state';

const KeyManagment: React.FC = () => {
  const [state, setState] = useRecoilState(keyManagementstate);
  const { key_details } = state;
  const deleteManagementHandler = () => {};
  const handleChange = () => {};

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
            children={KeyManagement.Message}
            className="text-sm md:text-base lg:w-3/4 font-normal text-gray400"
          />
        </div>
        <CreateKeyModal />
      </div>

      <div className="mt-14 flex flex-col gap-y-10 overflow-y-scroll h-full">
        {key_details.map((item, index) => (
          <div
            key={`key-management-input-${index}`}
            className="w-full flex sm:flex-col md:flex-row sm:items-start md:items-end gap-4 w-full"
          >
            <div className="flex flex-col gap-4 md:w-2/3">
              <h2 className="text-base md:text-lg text-primary900 font-semibold">
                {item.title}
              </h2>
              <p className="text-gray400 md:text-base">{item.description}</p>
              <div className="flex sm:gap-2 md:gap-8 md:items-center sm:flex-col md:flex-row">
                <div className="flex flex-col font-poppins rounded-lg bg-primary50 p-2 h-full md:w-2/3 sm:w-full border border-gray200">
                  <label className="font-medium px-2 mx-2 -mt-4 bg-white w-fit rounded-md border border-gray200 text-primary900">
                    {item.provider}
                  </label>
                  <label className="p-2 text-gray900 text-base">
                    {item.api_key}
                  </label>
                </div>
                <Button
                  size="small"
                  type="default"
                  shape="default"
                  onClick={deleteManagementHandler}
                  className="font-poppins !py-5 !px-4 !text-base border-2 !rounded-lg border-black font-medium flex justify-center"
                  name="Delete"
                  icon={<FiTrash2 />}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyManagment;
