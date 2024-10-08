import { createAction, props } from "@ngrx/store";
import { CategoryForm, CategoryItem } from "src/app/models/Transaction";

//Get categories
export const requestCategories = createAction(
  'Request Categories'
);

export const requestCategoriesSuccess = createAction(
  'Request Categories Success',
  props<{ categories: CategoryItem[] }>()
);

export const requestCategoriesError = createAction(
  'Request Categories Error',
  props<{ error: string }>()
);

//create category
export const createCategory = createAction(
    'Create Categories',
    props<{ categoryForm: CategoryForm }>()
);

export const createCategorySuccess = createAction(
    'Create Categories Success'
);

export const createCategoryError = createAction(
    'Create Categories Error'
);



//update categories
export const updateCategory = createAction(
    'Update Categories',
    props<{ id: string, category: CategoryForm }>()
);

export const updateCategorySuccess = createAction(
    'Update Categories Success'
);

export const updateCategoryError = createAction(
    'Update Categories Error'
);

//delete categories
export const deleteCategory = createAction(
    'Delete Categories',
    props<{ id: string }>()
);

export const deleteCategorySuccess = createAction(
    'Delete Categories Success'
);

export const deleteCategoryError = createAction(
    'Delete Categories Error'
);

