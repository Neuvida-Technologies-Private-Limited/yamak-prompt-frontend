import React from 'react';

import { useRecoilState } from 'recoil';

import { Pagination } from 'components/common';
import { EmptyKeyManagement, KeyItem } from '../..';
import { keyManagementState } from 'middleware/state';

interface KeysGridProps {
  onDeleteKey: (uuid: string) => Promise<any>;
}

const KeysGrid: React.FC<KeysGridProps> = ({ onDeleteKey }) => {
  const [keyState] = useRecoilState(keyManagementState);
  const { results } = keyState;

  return results.length === 0 ? (
    <EmptyKeyManagement />
  ) : (
    <>
      <div className="flex flex-col gap-y-10 px-6 py-8 ">
        {results.map((item, index) => (
          <KeyItem
            key={`key-management-input-${index}`}
            uuid={item.uuid}
            title={item.title}
            description={item.description}
            provider={item.provider}
            api_key={item.api_key}
            onDeleteKey={onDeleteKey}
          />
        ))}
      </div>
      <Pagination type="key-management" />
    </>
  );
};

export default KeysGrid;
