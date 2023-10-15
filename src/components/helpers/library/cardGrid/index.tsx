import { LibraryCardItem as CardItem } from 'types';
import { EmptyLibrary, LibraryCard } from 'components/helpers';
import { Pagination } from 'components/common';

interface CardsGridProps {
  items: CardItem[];
  onAddPrompt: (prompt: string) => Promise<any>;
  onDeletePrompt: (id: string) => Promise<any>;
  onPromptInfo: (id: string) => Promise<any>;
  onUpdatePrompt: (update: any, id: string) => Promise<any>;
}

const CardsGrid: React.FC<CardsGridProps> = ({
  items,
  onAddPrompt,
  onDeletePrompt,
  onPromptInfo,
  onUpdatePrompt,
}) => {
  return items.length === 0 ? (
    <EmptyLibrary onAddPrompt={onAddPrompt} />
  ) : (
    <div className="flex flex-col">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 font-poppins bg-gray50">
        {items.map(item => (
          <LibraryCard
            key={`library-card-item-${item.uuid}`}
            title={item.title}
            favourite={item.favourite}
            bookmarked={item.bookmarked}
            is_public={item.is_public}
            liked_by_user={item.liked_by_user}
            likes_dislikes_count={item.likes_dislikes_count}
            prompt_type={item.prompt_type}
            sample_output={item.sample_output}
            tags={item.tags}
            user_message={item.user_message}
            uuid={item.uuid}
            onDeletePrompt={onDeletePrompt}
            onPromptInfo={onPromptInfo}
            onUpdatePrompt={onUpdatePrompt}
          />
        ))}
      </div>
      <Pagination type="library" />
    </div>
  );
};

export default CardsGrid;
