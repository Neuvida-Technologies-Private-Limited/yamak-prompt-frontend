import React from 'react';
import {
  LibraryCardFilter,
  LibraryHeader,
  LibrarySearchArea,
} from 'components/helpers';

const library: React.FC = () => {
  return (
    <div className="font-poppins">
      <div className="shadow">
        <LibraryHeader />
        <LibraryCardFilter />
        <LibrarySearchArea />
      </div>
      <div className="p-6">Library cards</div>
    </div>
  );
};

export default library;
