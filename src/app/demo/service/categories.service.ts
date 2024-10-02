import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/models/Http';
import { CategoryForm, CategoryItem } from 'src/models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getAll(): Observable<Response<CategoryItem[]>> {
        return this.http.get<Response<CategoryItem[]>>(
        `${this.apiUrl}/category/all`
        );
    }

    create(data: CategoryForm): Observable<Response<CategoryItem>> {
        return this.http.post<Response<CategoryItem>>(
        `${this.apiUrl}/category/create`,
        data
        );
    }

    update(id: string, data: CategoryForm): Observable<Response<CategoryItem>> {
        return this.http.put<Response<CategoryItem>>(
        `${this.apiUrl}/category/${id}`,
        data
        );
    }

    delete(id: string): Observable<Response<CategoryItem>> {
        return this.http.delete<Response<CategoryItem>>(
        `${this.apiUrl}/category/${id}`
        );
    }
}
