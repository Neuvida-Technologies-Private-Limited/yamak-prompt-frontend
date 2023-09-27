import { atom } from 'recoil';

export const libraryState = atom({
  key: 'library-state',
  default: {
    items: [],
    filteredItems: [],
    activeTab: '1',
  },
});
