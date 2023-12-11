import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryItem, TransactionItem } from 'src/models/Transaction';
import { TransactionService } from './services/transaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, OnDestroy {
  public transactions: TransactionItem[] = [];

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public goToCategories(): void {
    this.router.navigate(['/list-categories']);
  }

  public onRefresh(): void {
    this.getTransactions();
  }

  private getTransactions(): void {
    this.subscriptions.add(
      this.transactionService.getAll().subscribe((response) => {
        if (response?.data?.length) {
          this.transactions = response?.data;
        }
      })
    );
  }
}
