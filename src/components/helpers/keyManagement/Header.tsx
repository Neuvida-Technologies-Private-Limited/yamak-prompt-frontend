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
    <div className="flex sm:flex-col md:flex-row justify-between items-start md:items-start gap-3 p-6 bg-white ">
      <div className="sm:w-full md:w-3/4">
        <Heading level={2} children="Key management" />
        <Text children={KeyManagement.MESSAGE} variant={TextVariants.MEDIUM} />
      </div>
      <CreateKeyModal createKey={onCreateKey} />
    </div>
  );
};

export default KeyHeader;
