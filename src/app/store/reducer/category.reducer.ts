import {Action, createFeatureSelector, createReducer, on} from "@ngrx/store";
import { CategoryItem } from "src/models/Transaction";
import { requestCategories, requestCategoriesError, requestCategoriesSuccess } from "../actions/category.action";


export const getCategoriesState = createFeatureSelector<CategoriesState>('categories');

export interface CategoriesState {
  categories: CategoryItem[];
  loading: boolean;
}

const categoriesInitialState: CategoriesState = {
    categories: [],
    loading: false
};

const reducer = createReducer(
    categoriesInitialState,

  on(requestCategories, (state: CategoriesState): CategoriesState => {
    return { ...state, loading: true };
  }),

  on(requestCategoriesSuccess, (state: CategoriesState, action): CategoriesState => {
    return { ...state, categories: action.categories, loading: false };
  }),

  on(requestCategoriesError, (state: CategoriesState): CategoriesState => {
    return { ...state, loading:false};
  }),

);

export function categoriesReducer(state: CategoriesState | undefined, action: Action): CategoriesState {
  return reducer(state, action);
}
