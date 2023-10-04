import { LibraryCardItem as CardItem } from 'types';
import { EmptyLibrary, LibraryCard } from 'components/helpers';

interface CardsGridProps {
  items: CardItem[];
  onAddPrompt: (prompt: string) => Promise<any>;
  onDeletePrompt: (id: string) => {};
  onPromptInfo: (id: string) => Promise<any>;
  onUpdatePrompt: (update: any, id: string) => void;
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
        {items.map((item, index) => (
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
            onDeletePrompt={onDeletePrompt}
            onPromptInfo={onPromptInfo}
            onUpdatePrompt={onUpdatePrompt}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
