import {Action, createFeatureSelector, createReducer, on} from "@ngrx/store";
import { TransactionItem } from "src/models/Transaction";
import { requestTransactions, requestTransactionsError, requestTransactionsSuccess } from "../actions/transaction.action";


export const getTransactionsState = createFeatureSelector<TransactionsState>('transactions');

export interface TransactionsState {
  transactions: TransactionItem[];
  loading: boolean;
}

const transactionsInitialState: TransactionsState = {
    transactions: [],
    loading: false
};

const reducer = createReducer(
    transactionsInitialState,

  on(requestTransactions, (state: TransactionsState): TransactionsState => {
    return { ...state, loading: true };
  }),

  on(requestTransactionsSuccess, (state: TransactionsState, action): TransactionsState => {
    return { ...state, transactions: action.transactions, loading: false };
  }),

  on(requestTransactionsError, (state: TransactionsState): TransactionsState => {
    return { ...state, loading:false};
  }),

);

export function transactionReducer(state: TransactionsState | undefined, action: Action): TransactionsState {
  return reducer(state, action);
}
