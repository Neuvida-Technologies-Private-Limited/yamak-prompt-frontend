import React from 'react';
import { Heading, Text } from 'components/common';
import { KeyManagement, TextVariants } from 'utils/constants';
import CreateKeyModal from './CreateKeyModal';
import { CreateKeyModal as KeyModal } from 'middleware/api/types';

interface KeyHeaderProps {
  onCreateKey: (key: KeyModal) => Promise<any>;
}

const KeyHeader: React.FC<KeyHeaderProps> = ({ onCreateKey }) => {
  return (
    <div className="flex sm:flex-col lg:flex-row justify-between items-start md:items-start mb-5 gap-3">
      <div>
        <Heading level={2} children="Key management" />
        <Text children={KeyManagement.MESSAGE} variant={TextVariants.MEDIUM} />
      </div>
      <CreateKeyModal createKey={onCreateKey} />
    </div>
  );
};

export default KeyHeader;
