import { LocalStorageService } from './../../../service/local-storage.service.ts.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { requestCharts } from 'src/app/store/actions/dashboard.action';
import { requestTransactions, setDatesTransactions } from 'src/app/store/actions/transaction.action';
import { getPreSelectedRange } from 'src/helper';

const DEFAULT_DATE_KEY = 'DEFAULT_DATE_KEY'
const CLOSING_DAY = 27;

@Component({
  selector: 'datepickertrange',
  templateUrl: './datepickertrange.component.html',
  styleUrl: './datepickertrange.component.scss'
})
export class DatepickertrangeComponent {

    date1: any;

    constructor(private localStorageService: LocalStorageService, private store$: Store){
        const defaultDates = localStorageService.get(DEFAULT_DATE_KEY)
        if(defaultDates){
            this.date1 = [new Date(defaultDates[0]), new Date(defaultDates[1])]
        }else{
            this.date1 = getPreSelectedRange(CLOSING_DAY)
            localStorageService.set(DEFAULT_DATE_KEY, this.date1)
        }

        this.setDateToStr();
    }

    public onSelectRange() {
        this.localStorageService.set(DEFAULT_DATE_KEY, this.date1)
        this.setDateToStr();
        this.store$.dispatch(requestTransactions())
    }

    private setDateToStr(){
        const fromDateStr = (this.date1[0] || new Date()).toISOString();
        const toDateStr = (this.date1[1] || new Date()).toISOString();
        this.store$.dispatch(setDatesTransactions({fromDate: fromDateStr, toDate: toDateStr}))
    }
}
