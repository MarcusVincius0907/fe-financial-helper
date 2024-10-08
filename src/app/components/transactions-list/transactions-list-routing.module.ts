import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TransactionsListComponent }
    ])],
    exports: [RouterModule]
})
export class TransactionsListRoutingModule { }
