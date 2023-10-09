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
