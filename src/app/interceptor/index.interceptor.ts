import { LocalStorageService } from './../service/local-storage.service.ts.service';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { localStorageKey } from '../constans';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService, private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.localStorageService.get(localStorageKey.JWT_TOKEN);

        let newReq = req
        if (token) {
            newReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`),
            });
        }
        return next.handle(newReq).pipe(catchError(error =>{
            if (error.status === 401) {
                this.router.navigate(['/auth/login'])
                this.localStorageService.set(localStorageKey.JWT_TOKEN, '')
            }
            return throwError(error);
        }))
    }
}
