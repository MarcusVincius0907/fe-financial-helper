import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryForm, CategoryItem } from 'src/models/Transaction';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit, OnDestroy {
  public tableHeader: string[] = ['Id', 'Texto', 'Valor', 'Editar', 'Deletar'];
  public tableBody: CategoryItem[] = [
  ];

  public category: CategoryItem;

  public isEdit: boolean = false;

  private subscriptions = new Subscription();

  constructor(
    private route: Router,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.category = {
      _id: '',
      text: '',
      value: '',
    };

    this.getCategories();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public toast(title: string, text: string) {
    this.toastr.success(title, text);
  }

  public onSubmit(): void {
    if (this.category?.text && this.category?.value) {
      const categoryForm = {
        text: this.category.text,
        value: this.category.value,
      };
      if (!this.isEdit) {
        this.subscriptions.add(
          this.categoryService.create(categoryForm).subscribe((response) => {
            if (response.status === 'success') {
              this.refreshList();
              this.toastr.success('Sucesso', 'Categoria criada.');
            } else {
              this.toastr.error('Erro', 'Não foi possível criar a categoria.');
            }

            this.resetCategoryModel();
          })
        );
      } else {
        this.subscriptions.add(
          this.categoryService
            .update(this.category._id, categoryForm)
            .subscribe((response) => {
              if (response.status === 'success') {
                this.refreshList();
                this.toastr.success('Sucesso', 'Categoria atualizada.');
              } else {
                this.toastr.error(
                  'Erro',
                  'Não foi possível atualizar a categoria.'
                );
              }

              this.onCancelEdit();
            })
        );
      }
    } else {
      this.toastr.info('Atenção', 'Preencha os dados.');
    }
  }

  public onEdit(category: CategoryItem): void {
    this.category = { ...category };
    this.isEdit = true;
  }

  public onCancelEdit(): void {
    this.resetCategoryModel();
    this.isEdit = false;
  }

  public onDelete(id: string): void {
    this.subscriptions.add(
      this.categoryService.delete(id).subscribe((response) => {
        if (response.status === 'success') {
          this.refreshList();
          this.toastr.success('Sucesso', 'Categoria deletada.');
        } else {
          this.toastr.error('Erro', 'Não foi possível deletar a categoria.');
        }
      })
    );
  }

  public goBack() {
    this.route.navigate(['list-transactions']);
  }

  private refreshList(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.subscriptions.add(
      this.categoryService.getAll().subscribe((response) => {
        if (response?.data?.length) {
          this.tableBody = response?.data;
        }
      })
    );
  }

  private resetCategoryModel(): void {
    this.category = {
      _id: '',
      text: '',
      value: '',
    };
  }
}
