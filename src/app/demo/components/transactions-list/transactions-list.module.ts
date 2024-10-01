import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionsFilterComponent } from './transactions-filter/transactions-filter.component';
import { TransactionsListRoutingModule } from './transactions-list-routing.module';




@NgModule({
  declarations: [TransactionsListComponent, TransactionsFilterComponent],
  imports: [
    CommonModule,
    TransactionsListRoutingModule
  ],
  bootstrap:[TransactionsListComponent]
})
export class TransactionsListModule { }
