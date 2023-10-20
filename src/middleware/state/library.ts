import { atom } from 'recoil';
import { LibraryCardItem } from 'types';

export const libraryState = atom({
  key: 'library-state',
  default: {
    items: [] as LibraryCardItem[],
    filteredItems: [] as LibraryCardItem[],
    activeTab: '1',
    error: '',
    status: 200,
  },
});

export const promptModalState = atom({
  key: 'prompt-modal-state',
  default: {
    title: '',
    titleError: '',
    userMessage: '',
    userMessageError: '',
    systemMessage: '',
    systemMessageError: '',
    promptOutput: '',
    promptOutputError: '',
    tags: '',
    tagsError: '',
  },
});

export const libraryPaginationState = atom({
  key: 'library-pagination-state',
  default: {
    currentPage: 1,
    count: 0,
    query: '',
    itemsPerPage: 10,
    hasNext: null,
    hasPrevious: null,
    totalPages: 0,
  },
});

export const libraryFavouritePaginationState = atom({
  key: 'library-favourite-pagination-state',
  default: {
    currentPage: 1,
    count: 0,
    query: '',
    itemsPerPage: 10,
    hasNext: null,
    hasPrevious: null,
    totalPages: 0,
  },
});

export const promptCardState = atom({
  key: 'prompt-card-state',
  default: {
    isFavourite: false,
    isLiked: false,
    likesCount: 0,
    isDisliked: false,
    dislikesCount: 0,
  },
});
export const importPromptState = atom({
  key: 'importPrompt-state',
  default: {
    workspaceID: '',
    workspaceIdError: '',
  },
});
