import { LocalStorageService } from './local-storage.service.ts.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/models/Http';
import { TransactionItem, TrasactionChart } from 'src/app/models/Transaction';
import { User } from '../models/User';
import { localStorageKey } from '../constans';



@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl: string;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
        this.apiUrl = environment.apiUrl;
    }

    setIsAuthenticated(token: string) {
        this.localStorageService.set(localStorageKey.JWT_TOKEN, token)
    }

    isAuthenticated(): boolean {
        const token = this.localStorageService.get(localStorageKey.JWT_TOKEN);
        return !!token;
    }

    login(data: User): Observable<Response<{ access_token: string }>> {
        return this.http.post<Response<{ access_token: string }>>(
            `${this.apiUrl}/user/login`,
            data
        );
    }
}
