import {Action, createFeatureSelector, createReducer, on} from "@ngrx/store";
import { TransactionItem } from "src/app/models/Transaction";
import { requestTransactions, requestTransactionsError, requestTransactionsSuccess, setDatesTransactions, syncTransactionsError, syncTransactionsSuccess } from "../actions/transaction.action";


export const getTransactionsState = createFeatureSelector<TransactionsState>('transactions');

export interface TransactionsState {
  transactions: TransactionItem[];
  loading: boolean;
  fromDate: string;
  toDate: string;
}

const transactionsInitialState: TransactionsState = {
    transactions: [],
    loading: false,
    fromDate: '',
    toDate: ''
};

const reducer = createReducer(
    transactionsInitialState,

  //get transactions
  on(requestTransactions, (state: TransactionsState): TransactionsState => {
    return { ...state, loading: true };
  }),

  on(requestTransactionsSuccess, (state: TransactionsState, action): TransactionsState => {
    return { ...state, transactions: action.transactions, loading: false };
  }),

  on(requestTransactionsError, (state: TransactionsState): TransactionsState => {
    return { ...state, loading:false};
  }),

  //sync transactions
  on(syncTransactionsSuccess, (state: TransactionsState, action): TransactionsState => {
    return { ...state, loading: false };
  }),

  on(syncTransactionsError, (state: TransactionsState): TransactionsState => {
    return { ...state, loading:false};
  }),


  //mutations
  on(setDatesTransactions, (state: TransactionsState, action): TransactionsState => {
    return { ...state, fromDate: action.fromDate, toDate: action.toDate };
  }),







);

export function transactionReducer(state: TransactionsState | undefined, action: Action): TransactionsState {
  return reducer(state, action);
}
