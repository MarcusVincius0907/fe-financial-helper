import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  Input,
} from '@angular/core';
import { CategoryItem, TransactionItem } from 'src/models/Transaction';

@Component({
  selector: 'transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit, OnChanges {
  @Input() transactions: TransactionItem[];

  tableHeader: string[] = ['Id', 'Descricao', 'Valor', 'Data', 'Categoria'];
  tableBody: TransactionItem[] = [
    {
      _id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
      category: 'marcus',
    },
    {
      _id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
      category: 'vitoria',
    },
    {
      _id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
      category: 'marcus',
    },
    {
      _id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
      category: 'marcus',
    },
  ];

  public categoryItems: CategoryItem[] = [
    {
      id: '1',
      value: 'lazer',
      text: 'Lazer',
    },
    {
      id: '1',
      value: 'marcus',
      text: 'Gastos Marcus',
    },
    {
      id: '1',
      value: 'vitoria',
      text: 'Gastos Vitoria',
    },
    {
      id: '1',
      value: 'casa',
      text: 'Casa',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.tableBody = changes['transactions'].currentValue;
    }
  }

  public onCategorySelected($event: any): void {
    let categorySelected: any = null;
    Object.values($event).forEach((option: any) => {
      if (option?.selected) {
        categorySelected = {
          id: option?.id,
          value: option?.value,
        };
      }
    });
  }
}
