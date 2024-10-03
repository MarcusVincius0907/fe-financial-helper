import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/demo/service/categories.service';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { TransactionService } from 'src/app/demo/service/transactions.service';
import { requestCategories } from 'src/app/store/actions/category.action';
import { requestTransactions, updateTransaction } from 'src/app/store/actions/transaction.action';
import { getCategories } from 'src/app/store/selectors/category.selector';
import { getTransactions } from 'src/app/store/selectors/transaction.selector';
import { CategoryItem, TransactionItem } from 'src/models/Transaction';

@Component({
  selector: 'transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent {
    transactions!: TransactionItem[];
    categories!: CategoryItem[]

    representatives!: any[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    searchValue: string | undefined;

    private subscriptions = new Subscription();

    constructor(private store$: Store) {}

    ngOnInit() {
        this.getTransactions();
        this.getCategories();

        this.subscriptions.add(
            this.store$.select(getCategories).subscribe(categories => {
                if(categories){
                    this.categories = categories
                }
            }),
        )

        this.subscriptions.add(
            this.store$.select(getTransactions).subscribe(transactions => {
                if(transactions){
                    this.transactions = transactions

                }

                this.loading = false;
            }),
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }


    public onCategorySelected($event: any, transaction: TransactionItem): void {
        let categoryIdSelected: any = null;
        Object.values($event).forEach((option: any) => {
          if (option?.selected) {
            categoryIdSelected = option?.id;
          }
        });

        const updatedTransaction: TransactionItem = {
          ...transaction,
          categoryId: categoryIdSelected,
        };

        this.subscriptions.add(
            this.store$.dispatch(updateTransaction({id: transaction._id, transaction: updatedTransaction}))
        );
    }

    private getTransactions(): void {
        this.subscriptions.add(
            this.store$.dispatch(requestTransactions())
        );
    }

    private getCategories(): void {
        this.subscriptions.add(
            this.store$.dispatch(requestCategories())
        );
    }



    clear(table: Table) {
        table.clear();
        this.searchValue = ''
    }

    getSeverity(status: string) {
        switch (status.toLowerCase()) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;

            default:
                return null;
        }
    }
}
