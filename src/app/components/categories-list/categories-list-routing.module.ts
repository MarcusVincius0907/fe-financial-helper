import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CategoriesListComponent }
    ])],
    exports: [RouterModule]
})
export class TransactionsListRoutingModule { }
