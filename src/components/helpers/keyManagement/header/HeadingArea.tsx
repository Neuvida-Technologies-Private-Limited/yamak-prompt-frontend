import React from 'react';
import { Heading, Text } from 'components/common';
import CreateKeyModal from './CreateKeyModal';
import { CreateKeyModal as KeyModal } from 'middleware/api/types';
import { KeyManagement, TextVariants } from 'utils/constants';

interface HeadingAreaProps {
  onCreateKey: (key: KeyModal) => Promise<any>;
}

const HeadingArea: React.FC<HeadingAreaProps> = ({ onCreateKey }) => {
  return (
    <div className="flex sm:flex-col md:flex-row justify-between items-start md:items-start gap-3 p-6 border-b-2 border-gray50">
      <div className="sm:w-full md:w-3/4">
        <Heading level={2} children="Key management" />
        <Text children={KeyManagement.MESSAGE} variant={TextVariants.MEDIUM} />
      </div>
      <CreateKeyModal createKey={onCreateKey} />
    </div>
  );
};

export default HeadingArea;
