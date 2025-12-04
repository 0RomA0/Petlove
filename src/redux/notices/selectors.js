export const selectNotices = (state) => state.notices.items;

export const selectIsLoading = (state) => state.notices.isLoading;

export const selectError = (state) => state.notices.error;

export const selectPerPage = (state) => state.notices.perPage;

export const selectPage = (state) => state.notices.page;

export const selectTotalPages = (state) => state.notices.totalPages;
