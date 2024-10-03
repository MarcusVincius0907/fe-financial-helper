import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { catchError, switchMap } from 'rxjs';
import { TransactionService } from 'src/app/demo/service/transactions.service';
import { requestTransactions, requestTransactionsError, requestTransactionsSuccess, updateTransaction, updateTransactionError, updateTransactionSuccess } from '../actions/transaction.action';

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
            switchMap(() =>
                this.transactionsService.getAll().pipe(
                    switchMap((response) => [
                        requestTransactionsSuccess({ transactions: response.data }),
                    ]),
                    catchError((error) => [requestTransactionsError({ error })])
                )
            )
        )
    );


    updateTransactionEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateTransaction),
            switchMap((action) =>
                this.transactionsService.update(action.id, action.transaction).pipe(
                    switchMap(() => {
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transação atualizada.' });
                        this.store$.dispatch(requestTransactions())
                        return [updateTransactionSuccess()]
                    }),
                    catchError(() => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível atualizar a transação.' });
                        return [updateTransactionError()]})
                )
            )
        )
    );

}
