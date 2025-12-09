export const selectNotices = (state) => state.notices.items;

export const selectIsLoading = (state) => state.notices.isLoading;

export const selectError = (state) => state.notices.error;

export const selectPerPage = (state) => state.notices.perPage;

export const selectNoticesPage = (state) => state.notices.page;

export const selectNoticesTotalPages = (state) => state.notices.totalPages;
