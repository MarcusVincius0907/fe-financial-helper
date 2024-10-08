import { createAction, props } from "@ngrx/store";
import { TransactionItem } from "src/app/models/Transaction";

//Get transactions
export const requestTransactions = createAction(
  'Request Transactions',
);

export const requestTransactionsSuccess = createAction(
  'Request Transactions Success',
  props<{ transactions: TransactionItem[] }>()
);

export const requestTransactionsError = createAction(
  'Request Transactions Error',
  props<{ error: string }>()
);

//
export const setDatesTransactions = createAction(
    'Set Dates Transactions',
    props<{ fromDate: string, toDate: string }>()
);


//update transactions
export const updateTransaction = createAction(
    'Update Transactions',
    props<{ id: string, transaction: TransactionItem }>()
);

export const updateTransactionSuccess = createAction(
    'Update Transactions Success'
);

export const updateTransactionError = createAction(
    'Update Transactions Error'
);

//sync transactions
export const syncTransactions = createAction(
    'Sync Transactions',
);

export const syncTransactionsSuccess = createAction(
    'Sync Transactions Success',
);

export const syncTransactionsError = createAction(
    'Sync Transactions Error',
    props<{ error: string }>()
);
