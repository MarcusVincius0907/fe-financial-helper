import { createSelector } from '@ngrx/store';
import { getTransactionsState, TransactionsState } from '../reducer/transaction.reducer';

export const getTransactions = createSelector(
    getTransactionsState,
    (state: TransactionsState) => state.transactions
);
