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
    ButtonModule
  ],
  bootstrap:[TransactionsListComponent]
})
export class TransactionsListModule { }
