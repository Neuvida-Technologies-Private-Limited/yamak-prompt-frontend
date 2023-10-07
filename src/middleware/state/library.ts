import { atom } from 'recoil';
import { LibraryCardItem } from 'types';

export const libraryState = atom({
  key: 'library-state',
  default: {
    items: [] as LibraryCardItem[],
    filteredItems: [] as LibraryCardItem[],
    activeTab: '1',
    error: '',
    status_code: 200,
  },
});

export const libraryPaginationState = atom({
  key: 'library-pagination',
  default: {
    currentPage: 1,
    count: 0,
    itemsPerPage: 10,
    hasNext: null,
    hasPrevious: null,
  },
});

export const promptModalState = atom({
  key: 'prompt-modal-state',
  default: {
    title: 'test',
    titleError: '',
    userMessage: 'test',
    userMessageError: '',
    systemMessage: 'test',
    systemMessageError: '',
    promptOutput: 'test',
    promptOutputError: '',
    tags: 'test',
    tagsError: '',
  },
});
