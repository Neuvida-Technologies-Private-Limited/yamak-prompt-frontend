import React, { useEffect } from 'react';
import { FiBookmark, FiUploadCloud } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { IoListCircleOutline } from 'react-icons/io5';

import Draft from './drafts';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import { Button, Input } from 'components/common';
import { GetWorkspaceHistory } from 'middleware/api';
import { searchHistoryState, workspaceHistoryState } from 'middleware/state';

interface CompletionHistoryProps {
  onHistorySearch: (input: string, id: string) => void;
  id: string;
  getHistory: () => Promise<void>;
}

// later these will come from API

const handleChange = () => {};
const handleClick = () => {};

const CompletionHistory: React.FC<CompletionHistoryProps> = ({
  onHistorySearch,
  id,
  getHistory,
}) => {
  const [workspaceHistory] = useRecoilState(workspaceHistoryState);
  const [searchInput, setSearchInput] = useRecoilState(searchHistoryState);

  const { input } = searchInput;
  const { history } = workspaceHistory;

  const handleHistorySearchChange = (input: string) => {
    // update the email value
    setSearchInput(old => ({
      ...old,
      input,
    }));
  };

  return (
    <div className="flex flex-col pl-4 w-full justify-between py-6">
      <div className="h-1/6">
        <div className="flex justify-between items-center font-poppins mb-4">
          <h1 className="font-semibold text-base">{Workspace.History}</h1>
          <IoListCircleOutline size={25} />
        </div>
        <Input
          id={Workspace.SearchHistory}
          name={Workspace.SearchHistory}
          placeholder={Workspace.SearchHistory}
          type={Workspace.Search}
          onChange={handleHistorySearchChange}
          variant={InputVariants.Filled}
        />
      </div>
      <div className="flex flex-col h-5/6">
        <div className="overflow-y-scroll pr-2 h-full">
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
