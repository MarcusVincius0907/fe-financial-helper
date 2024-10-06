import { createSelector } from '@ngrx/store';
import { getTransactionsState, TransactionsState } from '../reducer/transaction.reducer';

export const getTransactions = createSelector(
    getTransactionsState,
    (state: TransactionsState) => state.transactions
);

export const getTransactionDates = createSelector(
    getTransactionsState,
    (state: TransactionsState) => ({fromDate: state.fromDate, toDate: state.toDate})
);
