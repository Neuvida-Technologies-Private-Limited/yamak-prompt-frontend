import { atom } from 'recoil';
import { LibraryCardItem } from 'types';

export const libraryState = atom({
  key: 'library-state',
  default: {
    items: [] as LibraryCardItem[],
    filteredItems: [] as LibraryCardItem[],
    activeTab: '1',
  },
});

export const promptModalState = atom({
  key: 'prompt-modal-state',
  default: {
    title: '',
    userMessage: '',
    systemMessage: '',
    promptOutput: '',
    tags: '',
  },
});
