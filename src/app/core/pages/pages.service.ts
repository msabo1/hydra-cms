import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { MessagesService } from '../messages/messages.service';
import { QueryPagesDto } from './dto/query-pages.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { GetPageDto } from './dto/get-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './page.model';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { QueryResponse } from '../models/query-response.model';

@Injectable()
export class PagesService {
  private url: string = 'api/pages';

  constructor(
    private readonly http: HttpClient,
    private readonly messagesService: MessagesService
  ) { }

  get(query?: QueryPagesDto): Observable<QueryResponse<Page>>{
    const params: HttpParams = new HttpParams({fromObject: query as {[param: string]: string}});
    return this.http.get<Page[]>(this.url, {params, observe: 'response'})
      .pipe(
        map((response: HttpResponse<Page[]>): QueryResponse<Page> => ({data: response.body, total: Number(response.headers.get('Pagination-Count'))})),
        catchError(error => this.messagesService.handleHttpError(error))
      );
  }

  getById(id: string, getPageDto?: GetPageDto): Observable<Page>{
    const params: HttpParams = new HttpParams({fromObject: getPageDto as {[param: string]: string}});
    return this.http.get<Page>(`${this.url}/${id}`, {params}).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  create(createPageDto: CreatePageDto): Observable<Page>{
    return this.http.post<Page>(this.url, createPageDto).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  update(id: string, updatePageDto: UpdatePageDto): Observable<Page>{
    return this.http.patch<Page>(`${this.url}/${id}`, updatePageDto)
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

}
