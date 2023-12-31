import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionItem } from 'src/models/Transaction';
import { environment } from 'src/environments/environment';
import { Response } from 'src/models/Http';

@Injectable({
  providedIn: 'root',
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

  syncTransactions(): Observable<Response<TransactionItem[]>> {
    return this.http.get<Response<TransactionItem[]>>(
      `${this.apiUrl}/transaction/sync-transactions`
    );
  }
}
