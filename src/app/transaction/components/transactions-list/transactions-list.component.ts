import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CategoryItem, TransactionItem } from 'src/models/Transaction';
import { TransactionService } from '../../services/transaction.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() transactions: TransactionItem[];
  @Input() categories: CategoryItem[];

  @Output() refreshList = new EventEmitter<void>();

  private subscription = new Subscription();

  tableHeader: string[] = ['Id', 'Descricao', 'Valor', 'Data', 'Categoria'];
  tableBody: TransactionItem[] = [
    {
      _id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
      categoryId: 'marcus',
    },
    {
      _id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
      categoryId: 'vitoria',
    },
    {
      _id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
      categoryId: 'marcus',
    },
    {
      _id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
      categoryId: 'marcus',
    },
  ];

  constructor(
    private transactionService: TransactionService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.tableBody = changes['transactions'].currentValue;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

    this.subscription.add(
      this.transactionService
        .update(transaction._id, updatedTransaction)
        .subscribe((response) => {
          if (response.status === 'success') {
            this.refreshList.emit();
            this.toastr.success('Sucesso', 'Categoria alterada.');
          } else {
            this.toastr.error('Erro', 'Não foi possível alterar a categoria.');
          }
        })
    );
  }
}
