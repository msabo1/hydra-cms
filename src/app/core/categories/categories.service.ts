import { Injectable } from '@angular/core';
import { MessagesService } from '../messages/messages.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { QueryCategoriesDto } from './dto/query-categories.dto';
import { Category } from './category.model';
import { Observable } from 'rxjs';
import { catchError, catchError } from 'rxjs/operators';
import { GetCategoryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoriesService {
  private url: string = 'api/categories';

  constructor(
    private readonly http: HttpClient,
    private readonly messagesService: MessagesService
  ) { }

  get(query?: QueryCategoriesDto): Observable<Category[]> {
    const params: HttpParams = new HttpParams({fromObject: query as {[param: string]: string}});
    return this.http.get<Category[]>(`${this.url}`, {params}).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  getById(id: string, getCategoryDto?: GetCategoryDto): Observable<Category>{
    const params: HttpParams = new HttpParams({fromObject: getCategoryDto as {[param: string]: string}});
    return this.http.get<Category>(`${this.url}/${id}`, {params}).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  create(createCategoryDto: CreateCategoryDto): Observable<Category>{
    return this.http.post<Category>(this.url, createCategoryDto).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto): Observable<Category>{
    return this.http.patch(this.url, updateCategoryDto).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  delete(id: string): Observable<void>{
    return this.http.delete(`${this.url}/${id}`).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }
}
