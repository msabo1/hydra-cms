import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Users } from '../models/user.model';
import { catchError, tap, map } from 'rxjs/operators';
import { MessagesService } from './messages.service'
import { Role } from '../models/role.model';
import { CreateUserDto } from '../models/create-user.dto';
@Injectable()
export class UsersService {

  url: string = '/api/users'

  constructor(
    private readonly http: HttpClient,
    private readonly messagesService: MessagesService
    ) { }

  get(query: {sortBy?: string, roleId?: string, status?: string, limit?: string, offset?: string, cascade?: 'true' | 'false'}): Observable<Users>{
    const params: HttpParams = new HttpParams({fromObject: query});
    return this.http.get<User[]>(this.url, {params, observe: 'response'})
      .pipe(
        map((response: HttpResponse<User[]>): Users => {
          response.body.forEach(this.mapResponseToUserModel);
          return {users: response.body, total: Number(response.headers.get('Pagination-Count'))};
        }),
        catchError(error => this.messagesService.handleError(error))
      );
  }

  getById(id: string, query?: {cascade: 'true' | 'false'}): Observable<User>{
    const params: HttpParams =  new HttpParams({fromObject: query});
    return this.http.get<User>(`${this.url}/${id}`,{params})
      .pipe(
        map(this.mapResponseToUserModel),
        catchError(error => this.messagesService.handleError(error))
      );
  }

  create(createUserDto: CreateUserDto): Observable<User>{
    return this.http.post<User>(this.url, createUserDto).pipe(catchError(error => this.messagesService.handleError(error)));
  }

  private mapResponseToUserModel(user: User): User{
    if(user.role){
      user.role = new Role(user.role);
    }
    return user;
  }
}
