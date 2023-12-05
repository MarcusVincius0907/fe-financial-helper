import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTransactionsComponent } from './list-transactions.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'list-transactions', component: ListTransactionsComponent },
];

@NgModule({
  declarations: [ListTransactionsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  bootstrap: [ListTransactionsComponent],
})
export class ListTransactionsModule {}
