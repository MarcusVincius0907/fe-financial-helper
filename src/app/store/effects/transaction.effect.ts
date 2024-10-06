import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { catchError, switchMap, withLatestFrom } from 'rxjs';
import { TransactionService } from 'src/app/demo/service/transactions.service';
import {
    requestTransactions,
    requestTransactionsError,
    requestTransactionsSuccess,
    syncTransactions,
    syncTransactionsError,
    syncTransactionsSuccess,
    updateTransaction,
    updateTransactionError,
    updateTransactionSuccess,
} from '../actions/transaction.action';
import { getTransactionDates } from '../selectors/transaction.selector';

@Injectable()
export class TransactionsEffects {
    constructor(
        private actions$: Actions,
        private store$: Store,
        private transactionsService: TransactionService,
        private messageService: MessageService
    ) {}

    getTransactionsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestTransactions),
            withLatestFrom(this.store$.select(getTransactionDates)),
            switchMap(([, { fromDate, toDate }]) =>
                this.transactionsService
                    .getFilteredByDate(fromDate, toDate)
                    .pipe(
                        switchMap((response) => [
                            requestTransactionsSuccess({
                                transactions: response.data,
                            }),
                        ]),
                        catchError((error) => [
                            requestTransactionsError({ error }),
                        ])
                    )
            )
        )
    );

    updateTransactionEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateTransaction),
            switchMap((action) =>
                this.transactionsService
                    .update(action.id, action.transaction)
                    .pipe(
                        switchMap(() => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Transação atualizada.',
                            });
                            this.store$.dispatch(requestTransactions());
                            return [updateTransactionSuccess()];
                        }),
                        catchError(() => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro',
                                detail: 'Não foi possível atualizar a transação.',
                            });
                            return [updateTransactionError()];
                        })
                    )
            )
        )
    );

    syncTransactionsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(syncTransactions),
            withLatestFrom(this.store$.select(getTransactionDates)),
            switchMap(([, { fromDate, toDate }]) =>
                this.transactionsService
                    .syncTransactions(fromDate, toDate)
                    .pipe(
                        switchMap(() => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Sincronização finalizada',
                            });
                            return [syncTransactionsSuccess()];
                        }),
                        catchError((error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro',
                                detail: 'Não foi possível sincronizar',
                            });
                            return [syncTransactionsError({ error })];
                        })
                    )
            )
        )
    );
}
