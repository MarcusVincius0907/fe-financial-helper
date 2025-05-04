import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { catchError, switchMap, withLatestFrom } from 'rxjs';
import { TransactionService } from 'src/app/service/transactions.service';
import {
    requestTransactions,
    requestTransactionsError,
    requestTransactionsSuccess,
    syncTransactions,
    syncTransactionsError,
    syncTransactionsSuccess,
    updateAllByDescription,
    updateAllByDescriptionSuccess,
    updateTransaction,
    updateTransactionError,
    updateTransactionSuccess,
} from '../actions/transaction.action';
import { getTransactionDates } from '../selectors/transaction.selector';
import { requestCharts } from '../actions/dashboard.action';

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
                        switchMap((response) => {

                            return [
                                requestTransactionsSuccess({
                                    transactions: response.data,
                                }),
                                requestCharts(),
                            ];
                        }),
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
                            return [
                                updateTransactionSuccess(),
                                requestTransactions(),
                            ];
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

                            return [
                                syncTransactionsSuccess(),
                                requestTransactions(),
                            ];
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

    //create update all by description
    updateAllByDescriptionEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateAllByDescription),
            switchMap((action) =>
                this.transactionsService
                    .updateAllByDescription(action)
                    .pipe(
                        switchMap(() => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Transações atualizadas.',
                            });
                            return [
                                updateAllByDescriptionSuccess(),
                                requestTransactions(),
                            ];
                        }),
                        catchError(() => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro',
                                detail: 'Não foi possível atualizar as transações.',
                            });
                            return [updateAllByDescriptionSuccess()];
                        })
                    )
            )
        )
    );
}
