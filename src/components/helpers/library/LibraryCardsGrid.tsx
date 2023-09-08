import React from 'react';
import LibraryCard from './LibraryCard';

const LibraryCardsGrid = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 p-6 font-poppins bg-gray50">
      {Array.from(Array(10)).map((_, index) => (
        <LibraryCard
          key={`library-card-item-${index}`}
          heading="Human Written | 100% Unique | SEO Optimized Article"
          subHeading="SEO/Writing"
        />
      ))}
    </div>
  );
};

export default LibraryCardsGrid;
