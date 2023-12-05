import { Component, OnInit } from '@angular/core';
import { TransactionItem } from 'src/models/Transaction';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.scss'],
})
export class ListTransactionsComponent implements OnInit {
  tableHeader: string[] = ['Id', 'Descricao', 'Valor', 'Data'];
  tableBody: TransactionItem[] = [
    {
      id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
    },
    {
      id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
    },
    {
      id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
    },
    {
      id: '1',
      description: 'Sorvetes',
      externalId: 'abc',
      amount: '30,00',
      date: new Date().toISOString(),
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
