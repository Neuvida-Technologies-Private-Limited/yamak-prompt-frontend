import React, { useEffect } from 'react';
import { FiBookmark, FiUploadCloud } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { IoListCircleOutline } from 'react-icons/io5';

import Draft from './drafts';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import { Button, Heading, Input, Pagination, Text } from 'components/common';
import { GetWorkspaceHistory } from 'middleware/api';
import { searchHistoryState, workspaceHistoryState } from 'middleware/state';

interface CompletionHistoryProps {
  onHistorySearch: (input: string, id: string) => void;
  onUpdatePrompt: (update: any, id: string) => Promise<any>;
  id: string;
}

const CompletionHistory: React.FC<CompletionHistoryProps> = ({
  onHistorySearch,
  onUpdatePrompt,
  id,
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
    <div className="flex flex-col w-full pb-6 pt-2">
      <div className="-mb-2  pr-4">
        <div className="flex items-center font-poppins mb-2">
          <h1 className="font-semibold text-base">{Workspace.History}</h1>
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
      <div className="flex flex-col justify-between h-5/6 max-h-5/6 overflow-y-scroll pr-4 mt-8">
        <div className="">
          {history.length === 0 ? (
            <>
              <Heading children={Workspace.NoHistoryHead} level={4} />
              <Text children={Workspace.NoHistoryPara} />
            </>
          ) : (
            history.map((item, index) => (
              <Draft
                key={`draft-item-${index}`}
                title={item.title}
                onUpdatePrompt={onUpdatePrompt}
                uuid={item.uuid}
                bookmarked={item.bookmarked}
              />
            ))
          )}
        </div>

        <Pagination type="workspace-history" />

        {/* filters */}

        {/* <div className="flex justify-center gap-4 mt-4 flex-wrap">
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
        </div> */}
      </div>
    </div>
  );
};

export default CompletionHistory;
