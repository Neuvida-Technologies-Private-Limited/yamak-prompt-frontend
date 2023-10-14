import React from 'react';
import { Heading, Text } from 'components/common';
import { KeyManagement } from 'utils/constants';
import CreateKeyModal from './CreateKeyModal';

interface KeyHeaderProps {
  onCreateKey: () => Promise<boolean>;
}

const KeyHeader: React.FC<KeyHeaderProps> = ({ onCreateKey }) => {
  return (
    <div className="flex sm:flex-col lg:flex-row justify-between items-start md:items-start mb-5 gap-3">
      <div>
        <Heading level={2} children="Key management" />
        <Text
          children={KeyManagement.MESSAGE}
          className="text-sm md:text-base lg:w-3/4 font-normal text-gray400"
        />
      </div>
      <CreateKeyModal createKey={onCreateKey} />
    </div>
  );
};

export default KeyHeader;
