import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Draft from './drafts';
import { Workspace, InputVariants } from 'utils/constants';
import { Heading, Input, Pagination, Text } from 'components/common';
import {
  workspaceHistoryPaginationState,
  workspaceHistoryState,
} from 'middleware/state';

interface CompletionHistoryProps {
  onHistorySearch: (input: string) => void;
  onUpdatePrompt: (update: any, id: string) => Promise<any>;
  onPublishPrompt: (uuid: string, is_public: boolean) => Promise<any>;
}

const CompletionHistory: React.FC<CompletionHistoryProps> = ({
  onHistorySearch,
  onUpdatePrompt,
  onPublishPrompt,
}) => {
  const [workspaceHistory] = useRecoilState(workspaceHistoryState);
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

  return (
    <div className="flex flex-col w-full pb-6 pt-2">
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
      <div className="flex flex-col justify-between pr-4">
        <div className="mt-4 mb-4">
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
                onPublishPrompt={onPublishPrompt}
                uuid={item.uuid}
                bookmarked={item.bookmarked}
                systemMessage={item.system_message}
                userMessage={item.user_message}
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
