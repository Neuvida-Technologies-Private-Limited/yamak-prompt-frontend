import { atom } from 'recoil';

export const paginationState = atom({
  key: 'pagination',
  default: {
    currentPage: 1,
    count: 0,
    itemsPerPage: 10,
    hasNext: null,
    hasPrevious: null,
    query: '',
    totalPages: 0,
  },
});
