import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/demo/service/categories.service';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { TransactionService } from 'src/app/demo/service/transactions.service';
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

    constructor(private transactionsService: TransactionService, private categoriesService: CategoriesService) {}

    ngOnInit() {
        this.getTransactions();
        this.getCategories();

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    private getTransactions(): void {
        this.subscriptions.add(
            this.transactionsService.getAll().subscribe((response) => {
                if (response?.data?.length) {
                    this.transactions = response?.data;
                }
                this.loading = false;
            })
        );
    }

    private getCategories(): void {
        this.subscriptions.add(
            this.categoriesService.getAll().subscribe((response) => {
            if (response?.data?.length) {
                this.categories = response?.data;
            }
            })
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
