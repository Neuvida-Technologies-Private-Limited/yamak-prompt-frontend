import React, { useEffect } from 'react';
import { FiBookmark, FiUploadCloud } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { IoListCircleOutline } from 'react-icons/io5';

import Draft from './drafts';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import { Button, Input } from 'components/common';
import { GetWorkspaceHistory } from 'middleware/api';
import { workspaceHistoryState } from 'middleware/state';

interface CompletionHistoryProps {
  id: string | undefined;
}

// later these will come from API

const handleChange = () => {};
const handleClick = () => {};

const CompletionHistory: React.FC<CompletionHistoryProps> = ({ id }) => {
  const [workspaceHistory, setWorkspaceHistory] = useRecoilState(
    workspaceHistoryState
  );
  const { history } = workspaceHistory;

  useEffect(() => {
    async function getHistory() {
      if (id) {
        try {
          const res = await GetWorkspaceHistory(id);
          setWorkspaceHistory(old => ({
            ...old,
            history: Array.isArray(res.data) ? res.data : [],
          }));
        } catch (error: any) {
          console.log(error);
        }
      }
    }

    getHistory();
  }, [id]);

  return (
    <div className="flex flex-col pl-4 w-full justify-between py-6">
      <div className="flex justify-between items-center font-poppins mb-4">
        <h1 className="font-semibold text-base">{Workspace.History}</h1>
        <IoListCircleOutline size={25} />
      </div>
      <Input
        id={Workspace.SearchLibrary}
        name={Workspace.SearchLibrary}
        placeholder={Workspace.SearchLibrary}
        type={Workspace.Search}
        onChange={handleChange}
        variant={InputVariants.Filled}
      />
      <div className="flex flex-col h-4/5">
        <div className="pt-2 overflow-y-scroll pr-2 h-full">
          {history.length === 0 ? (
            <p>no history!</p>
          ) : (
            history.map((item, index) => (
              <Draft key={`draft-item-${index}`} title={item.title} />
            ))
          )}
        </div>
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <Button
            size={'large'}
            variant={ButtonVariants.SECONDARY}
            onClick={handleClick}
            icon={<FiBookmark />}
          />
          <Button
            size={'large'}
            variant={ButtonVariants.SECONDARY}
            onClick={handleClick}
            className="!bg-gray200 !text-gray700"
            icon={<FiUploadCloud />}
          />
        </div>
      </div>
    </div>
  );
};

export default CompletionHistory;
