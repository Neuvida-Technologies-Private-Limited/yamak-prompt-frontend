import { LibraryCardItem as CardItem } from 'types';
import { LibraryCard } from 'components/helpers';

const CardsGrid: React.FC<{ items: CardItem[] }> = ({ items }) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 font-poppins bg-gray50">
      {items.length === 0 ? (
        <p>No items...</p>
      ) : (
        items.map((item, index) => (
          <LibraryCard
            key={`library-card-item-${index}`}
            title={item.title}
            bookmarked={item.bookmarked}
            is_public={item.is_public}
            liked_by_user={item.liked_by_user}
            likes_dislikes_count={item.likes_dislikes_count}
            prompt_type={item.prompt_type}
            sample_output={item.sample_output}
            tags={item.tags}
            user_message={item.user_message}
            uuid={item.uuid}
          />
        ))
      )}
    </div>
  );
};

export default CardsGrid;
