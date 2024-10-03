import { createSelector } from '@ngrx/store';
import { getCategoriesState, CategoriesState } from '../reducer/category.reducer';

export const getCategories = createSelector(
    getCategoriesState,
    (state: CategoriesState) => state.categories
);
