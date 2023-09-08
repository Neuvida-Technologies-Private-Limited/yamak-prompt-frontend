import React from 'react';
import {
  LibraryCard,
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
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 p-6 font-poppins bg-gray50">
        {Array.from(Array(10)).map(() => (
          <LibraryCard
            heading="Human Written | 100% Unique | SEO Optimized Article"
            subHeading="SEO/Writing"
          />
        ))}
      </div>
    </div>
  );
};

export default library;
