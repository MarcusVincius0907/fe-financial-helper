import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/models/Http';
import { TransactionItem, TrasactionChart } from 'src/app/models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getAll(): Observable<Response<TransactionItem[]>> {
        return this.http.get<Response<TransactionItem[]>>(
        `${this.apiUrl}/transaction/all`
        );
    }

    update(
        id: string,
        bodyData: TransactionItem
    ): Observable<Response<TransactionItem>> {
        return this.http.put<Response<TransactionItem>>(
        `${this.apiUrl}/transaction/${id}`,
        bodyData
        );
    }

    syncTransactions(
        fromDate: string,
        toDate: string
    ): Observable<Response<TransactionItem[]>> {
        return this.http.get<Response<TransactionItem[]>>(
        `${this.apiUrl}/transaction/sync-transactions/${fromDate}/${toDate}`
        );
    }

    getFilteredByDate(
        fromDate: string,
        toDate: string
    ): Observable<Response<TransactionItem[]>> {
        return this.http.get<Response<TransactionItem[]>>(
        `${this.apiUrl}/transaction/${fromDate}/${toDate}`
        );
    }

    getTransactionChart(
        fromDate: string,
        toDate: string
    ): Observable<Response<TrasactionChart>> {
        return this.http.get<Response<TrasactionChart>>(
        `${this.apiUrl}/charts/transactions/${fromDate}/${toDate}`
        );
    }
}
