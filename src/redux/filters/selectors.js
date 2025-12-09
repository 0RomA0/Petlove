export const selectCategories = (state) => state.filters.categories;
export const selectSpecies = (state) => state.filters.species;
export const selectSex = (state) => state.filters.sex;

export const selectSelectedCategory = (state) => state.filters.selectedCategory;
export const selectSelectedSex = (state) => state.filters.selectedSex;
export const selectSelectedSpecies = (state) => state.filters.selectedSpecies;

export const selectIsLoading = (state) => state.filters.isLoading;

export const selectError = (state) => state.filters.error;
