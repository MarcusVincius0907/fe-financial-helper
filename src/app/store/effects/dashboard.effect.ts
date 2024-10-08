import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, switchMap, withLatestFrom } from 'rxjs';
import { TransactionService } from 'src/app/service/transactions.service';
import { getTransactionDates } from '../selectors/transaction.selector';
import {
    requestCharts,
    requestChartsError,
    requestChartsSuccess,
} from '../actions/dashboard.action';

@Injectable()
export class ChartsEffects {
    constructor(
        private actions$: Actions,
        private store$: Store,
        private transactionsService: TransactionService
    ) {}

    getChartsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestCharts),
            withLatestFrom(this.store$.select(getTransactionDates)),
            switchMap(([, { fromDate, toDate }]) =>
                this.transactionsService
                    .getTransactionChart(fromDate, toDate)
                    .pipe(
                        switchMap((response) => [
                            requestChartsSuccess({
                                charts: response.data,
                            }),
                        ]),
                        catchError((error) => [requestChartsError({ error })])
                    )
            )
        )
    );
}
