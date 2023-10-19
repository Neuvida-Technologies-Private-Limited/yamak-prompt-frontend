import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Draft from './drafts';
import { Workspace, InputVariants, TextVariants } from 'utils/constants';
import { Heading, Input, Pagination, Text } from 'components/common';
import {
  workspaceHistoryPaginationState,
  workspaceHistoryState,
} from 'middleware/state';

interface CompletionHistoryProps {
  onHistorySearch: (input: string) => void;
  onUpdatePrompt: (update: any, id: string) => Promise<any>;
  getHistory: (currentPage: number) => Promise<void>;
  currentPage: number;
}

const CompletionHistory: React.FC<CompletionHistoryProps> = ({
  onHistorySearch,
  onUpdatePrompt,
  getHistory,
  currentPage,
}) => {
  const workspaceHistory = useRecoilValue(workspaceHistoryState);
  const [, setSearchInput] = useRecoilState(workspaceHistoryPaginationState);
  const [input, setInput] = useState('');

  const { history } = workspaceHistory;

  function formSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (input === '') return;
    setSearchInput(old => ({ ...old, query: input, currentPage: 1 }));
    onHistorySearch(input);
  }

  useEffect(() => {
    if (input === '') {
      setSearchInput(old => ({ ...old, query: '' }));
    }
  }, [setSearchInput, input]);

  useEffect(() => {
    async function onHistoryChange() {
      try {
        await getHistory(currentPage);
      } catch (error) {}
    }

    onHistoryChange();
  }, [getHistory, currentPage]);

  return (
    <div className="flex flex-col w-full h-full overflow-y-hidden justify-between pb-2 pt-2">
      <div className="-mb-2  pr-4">
        <div className="flex items-center font-poppins mb-2">
          <h1 className="font-semibold text-base">{Workspace.History}</h1>
        </div>
        <form onSubmit={formSubmitHandler}>
          <Input
            id={Workspace.SearchHistory}
            name={Workspace.SearchHistory}
            placeholder={Workspace.SearchHistory}
            type={Workspace.Search}
            value={input}
            onChange={setInput}
            variant={InputVariants.Filled}
          />
        </form>
      </div>
      <div className="flex flex-col h-full overflow-y-scroll pr-4">
        <div className="mt-4 mb-4">
          {history.length === 0 ? (
            <>
              <Heading children={Workspace.NoHistoryHead} level={4} />
              <Text children={Workspace.NoHistoryPara} />
            </>
          ) : (
            history.map((item, index) => (
              <>
                <Draft
                  key={item.uuid}
                  title={item.title}
                  onUpdatePrompt={onUpdatePrompt}
                  uuid={item.uuid}
                  bookmarked={item.bookmarked}
                  systemMessage={item.system_message}
                  userMessage={item.user_message}
                  published={item.published}
                  output={item.prompt_output}
                  tags={item.tags}
                />
              </>
            ))
          )}
        </div>

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
      <Pagination type="workspace-history" />
    </div>
  );
};

export default CompletionHistory;
