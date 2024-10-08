import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionsFilterComponent } from './transactions-filter/transactions-filter.component';
import { TransactionsListRoutingModule } from './transactions-list-routing.module';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { transactionReducer } from 'src/app/store/reducer/transaction.reducer';
import { TransactionsEffects } from 'src/app/store/effects/transaction.effect';
import { categoriesReducer } from 'src/app/store/reducer/category.reducer';
import { CategoriesEffects } from 'src/app/store/effects/category.effect';


@NgModule({
  declarations: [TransactionsListComponent, TransactionsFilterComponent],
  imports: [
    CommonModule,
    TransactionsListRoutingModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    ProgressBarModule,
    ButtonModule,
    ToastModule,
    StoreModule.forFeature('categories', categoriesReducer),
    StoreModule.forFeature('transactions', transactionReducer),
    EffectsModule.forFeature([TransactionsEffects])
  ],
  bootstrap:[TransactionsListComponent],
  providers:[MessageService]
})
export class TransactionsListModule { }
