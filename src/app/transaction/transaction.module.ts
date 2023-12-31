import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TransactionChartComponent } from './components/transaction-chart/transaction-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

const routes: Routes = [
  { path: 'list-transactions', component: TransactionComponent },
  { path: 'list-categories', component: CategoryListComponent },
  { path: 'charts', component: TransactionChartComponent },
];

@NgModule({
  declarations: [
    TransactionComponent,
    TransactionsListComponent,
    CategoryListComponent,
    TransactionChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
    NgApexchartsModule,
  ],
  bootstrap: [TransactionComponent],
  providers: [],
})
export class TransactionModule {}
