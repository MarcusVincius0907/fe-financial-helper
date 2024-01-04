import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { generateISODate, getLastAndNext5Years } from 'src/helper';
import { TransactionService } from '../../services/transaction.service';
import { Subscription } from 'rxjs';
import { DIA_FECHAMENTO_FATURA } from 'src/constans';

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

@Component({
  selector: 'transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss'],
})
export class TransactionFilterComponent implements OnInit {
  @Output() onDateSubmit = new EventEmitter<{
    fromDate: string;
    toDate: string;
  }>();

  public months: string[] = MONTHS;
  public years: number[];

  public monthSelected: string;
  public yearSelected: number;

  constructor() {
    this.years = getLastAndNext5Years();
  }

  ngOnInit(): void {}

  public onSearch(): void {
    if (!this.yearSelected || !this.monthSelected) {
      console.error('Select both options');
      return;
    }

    //because it starts on 0
    const fromMonth = Number(this.monthSelected) + 1;
    //because we need the follow month, but need if its december
    const toMonth = fromMonth + 1 === 13 ? 1 : fromMonth + 1;

    const toYear =
      fromMonth + 1 === 13 ? Number(this.yearSelected) + 1 : this.yearSelected;

    const fromDate = generateISODate(
      this.yearSelected,
      fromMonth,
      DIA_FECHAMENTO_FATURA
    );
    const toDate = generateISODate(toYear, toMonth, DIA_FECHAMENTO_FATURA);

    this.onDateSubmit.emit({ fromDate, toDate });
  }
}
