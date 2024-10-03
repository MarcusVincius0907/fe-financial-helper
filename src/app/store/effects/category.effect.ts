import {
    deleteCategory,
    deleteCategorySuccess,
    deleteCategoryError,
    requestCategories,
    requestCategoriesError,
    requestCategoriesSuccess,
    updateCategory,
    updateCategorySuccess,
    updateCategoryError,
    createCategory,
    createCategorySuccess,
    createCategoryError,
} from './../actions/category.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { catchError, switchMap } from 'rxjs';
import { CategoriesService } from 'src/app/demo/service/categories.service';

@Injectable()
export class CategoriesEffects {
    constructor(
        private actions$: Actions,
        private store$: Store,
        private categoriesService: CategoriesService,
        private messageService: MessageService
    ) {}

    getCategoriesEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestCategories),
            switchMap(() =>
                this.categoriesService.getAll().pipe(
                    switchMap((response) => [
                        requestCategoriesSuccess({ categories: response.data }),
                    ]),
                    catchError((error) => [requestCategoriesError({ error })])
                )
            )
        )
    );

    createCategoryEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createCategory),
            switchMap((action) =>
                {
                    debugger; return this.categoriesService.create(action.categoryForm).pipe(
                    switchMap(() => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria criada.' });
                        this.store$.dispatch(requestCategories())
                        return [createCategorySuccess()]
                    }),
                    catchError(() => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível criar a categoria.' });
                        return [createCategoryError()]})
                )}
            )
        )
    );

    updateCategoryEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCategory),
            switchMap((action) =>
                this.categoriesService.update(action.id, action.category).pipe(
                    switchMap(() => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria atualizada.' });
                        this.store$.dispatch(requestCategories())
                        return [updateCategorySuccess()]
                    }),
                    catchError(() => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível atualizar a categoria.' });
                        return [updateCategoryError()]})
                )
            )
        )
    );

    deleteCategoryEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCategory),
            switchMap((action) =>
                this.categoriesService.delete(action.id).pipe(
                    switchMap(() => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria deletada.' });
                        this.store$.dispatch(requestCategories())
                        return [deleteCategorySuccess()]}),
                    catchError(() => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível deletar a categoria.' });
                        return [deleteCategoryError()]})
                )
            )
        )
    );
}
