import { Component, OnInit } from '@angular/core';
import { CategoryItem, TransactionItem } from 'src/models/Transaction';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.scss'],
})
export class ListTransactionsComponent implements OnInit {
  tableHeader: string[] = ['Id', 'Descricao', 'Valor', 'Data', 'Categoria'];
  tableBody: TransactionItem[] = [
    {
      id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
      category: 'marcus',
    },
    {
      id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
      category: 'vitoria',
    },
    {
      id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
      category: 'marcus',
    },
    {
      id: '1',
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

  public onRefresh(): void {}

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
