import { LocalStorageService } from './../service/local-storage.service.ts.service';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { localStorageKey } from '../constans';

@Injectable({
    providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.localStorageService.get(localStorageKey.JWT_TOKEN);

        if (token) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`),
            });
            return next.handle(clonedReq);
        }
        return next.handle(req);
    }
}
