import { KEY_OF_EVENTS, SORT_ORDER } from '../constants/event-constants.js';

export const parseSortParams = ({ sortOrder, sortBy }) => {
  const parsedSortOrder = SORT_ORDER.includes(sortOrder)
    ? sortOrder
    : SORT_ORDER[0];
  const parsedSortBy = KEY_OF_EVENTS.includes(sortBy)
    ? sortBy
    : KEY_OF_EVENTS[0];
  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
