import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/service/categories.service';
import {
    createCategory,
    deleteCategory,
    updateCategory,
} from 'src/app/store/actions/category.action';
import { getCategories } from 'src/app/store/selectors/category.selector';
import { CategoryItem } from 'src/app/models/Transaction';

@Component({
    selector: 'categories-list',
    templateUrl: './categories-list.component.html',
    styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    public tableHeader: string[] = [
        'Id',
        'Texto',
        'Valor',
        'Budget',
        'Editar',
        'Deletar',
    ];
    public tableBody: CategoryItem[] = [];
    public category: CategoryItem;
    public isEdit: boolean = false;
    public categoryDialog: boolean = false;
    public deleteDialog: boolean = false;
    public submitted: boolean = false;

    private subscriptions = new Subscription();

    constructor(
        private messageService: MessageService,
        private store$: Store,
        private categoriesService: CategoriesService
    ) {}

    ngOnInit(): void {
        this.resetCategoryModel();

        this.subscriptions.add(
            this.store$.select(getCategories).subscribe((categories) => {
                if (categories) {
                    this.tableBody = categories;
                }
            })
        );

    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /* public toast(title: string, text: string) {
        this.toastr.success(title, text);
    }
 */

    public openNew(): void {
        this.categoryDialog = true;
    }

    public hideDialog() {
        this.categoryDialog = false;
        this.submitted = false;
        this.resetCategoryModel();
        this.isEdit = false;
    }

    public onSubmit(): void {
        if (this.category?.text && this.category?.value && this.category?.budget) {
            const categoryForm = {
                text: this.category.text,
                value: this.category.value,
                budget: this.category.budget
            };
            if (!this.isEdit) {
                this.subscriptions.add(
                    this.store$.dispatch(createCategory({ categoryForm }))
                );
            } else {
                this.subscriptions.add(
                    this.store$.dispatch(
                        updateCategory({
                            id: this.category._id,
                            category: categoryForm,
                        })
                    )
                );
            }

            this.hideDialog();
        } else {
            this.messageService.add({
                severity: 'info',
                summary: 'Atenção',
                detail: 'Preencha os dados.',
            });
        }
    }

    public onEdit(category: CategoryItem): void {
        this.categoryDialog = true;
        this.category = { ...category };
        this.isEdit = true;
    }

    public onCancelEdit(): void {
        this.resetCategoryModel();
        this.isEdit = false;
    }

    public onOpenDeleteDialog(category: CategoryItem) {
        this.category = { ...category };
        this.deleteDialog = true;
    }

    public onDelete(id: string): void {
        this.deleteDialog = false;
        this.subscriptions.add(
            this.store$.dispatch(deleteCategory({id}))
        );
    }

    public onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    private resetCategoryModel(): void {
        this.category = {
            _id: '',
            text: '',
            value: '',
            budget: 0
        };
    }
}
