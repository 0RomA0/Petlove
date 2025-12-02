export const selectNews = (state) => state.news.items;

export const selectIsLoading = (state) => state.news.isLoading;

export const selectError = (state) => state.news.error;

export const selectPerPage = (state) => state.news.perPage;

export const selectPage = (state) => state.news.page;

export const selectTotalPages = (state) => state.news.totalPages;
