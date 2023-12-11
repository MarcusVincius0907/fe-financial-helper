import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryItem } from 'src/models/Transaction';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  @Output() refreshList = new EventEmitter<void>();

  tableHeader: string[] = ['Id', 'Texto', 'Valor', 'Editar', 'Deletar'];
  tableBody: CategoryItem[] = [
    {
      id: '1',
      value: 'lazer',
      text: 'Lazer',
    },
    {
      id: '1',
      value: 'marcus',
      text: 'Gastos Marcus',
    },
    {
      id: '1',
      value: 'vitoria',
      text: 'Gastos Vitoria',
    },
    {
      id: '1',
      value: 'casa',
      text: 'Casa',
    },
  ];

  category: CategoryItem;

  isEdit: boolean = false;

  constructor(
    private route: Router,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  ngOnInit(): void {
    this.category = {
      text: '',
      value: '',
    };
  }

  public onSubmit(): void {
    if (this.category?.text && this.category?.value) {
      if (!this.isEdit) {
        this.categoryService.create(this.category).subscribe((response) => {
          if (response.status === 'success') {
            this.refreshList.emit();
          }
        });
      }
    } else {
      console.error('Fill category information');
    }
  }

  public onEdit(category: CategoryItem): void {
    this.category = { ...category };
    this.isEdit = true;
  }

  public onCancelEdit(): void {
    this.category = {
      text: '',
      value: '',
    };
    this.isEdit = false;
  }

  public onDelete(id?: string): void {}

  public goBack() {
    this.route.navigate(['list-transactions']);
  }
}
