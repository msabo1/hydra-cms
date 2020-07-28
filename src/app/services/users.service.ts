import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, tap } from 'rxjs/operators';
import { ErrorsService } from './errors.service'
@Injectable()
export class UsersService {

  url: string = '/api/users'

  constructor(
    private readonly http: HttpClient,
    private readonly errorsService: ErrorsService
    ) { }

  getById(id: string, query?: {cascade: 'true' | 'false'}): Observable<User>{
    const params: HttpParams =  new HttpParams({fromObject: query});
    return this.http.get<User>(`${this.url}/${id}`,{params})
      .pipe(
        catchError(error => this.errorsService.handleError(error))
      );
  }
}
