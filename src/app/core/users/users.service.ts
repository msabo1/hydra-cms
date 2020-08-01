import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { catchError, tap, map } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service'
import { Role } from '../roles/models/role.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { QueryResponse } from '../models/query-response.mode'

@Injectable()
export class UsersService {

  url: string = '/api/users'

  constructor(
    private readonly http: HttpClient,
    private readonly messagesService: MessagesService
    ) { }

  get(query: QueryUsersDto): Observable<QueryResponse<User>>{
    const params: HttpParams = new HttpParams({fromObject: query as {[param: string]: string}});
    return this.http.get<User[]>(this.url, {params, observe: 'response'})
      .pipe(
        map((response: HttpResponse<User[]>): QueryResponse<User> => {
          response.body.forEach(this.mapResponseToUserModel);
          return {data: response.body, total: Number(response.headers.get('Pagination-Count'))};
        }),
        catchError(error => this.messagesService.handleHttpError(error))
      );
  }

  getById(id: string, query?: {cascade: 'true' | 'false'}): Observable<User>{
    const params: HttpParams =  new HttpParams({fromObject: query});
    return this.http.get<User>(`${this.url}/${id}`,{params})
      .pipe(
        map(this.mapResponseToUserModel),
        catchError(error => this.messagesService.handleHttpError(error))
      );
  }

  create(createUserDto: CreateUserDto): Observable<User>{
    return this.http.post<User>(this.url, createUserDto).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  update(id: string, updateUserDto: UpdateUserDto): Observable<User>{
    return this.http.patch<User>(`${this.url}/${id}`, updateUserDto).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  delete(id: string){
    return this.http.delete(`${this.url}/${id}`).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  private mapResponseToUserModel(user: User): User{
    if(user.role){
      user.role = new Role(user.role);
    }
    return user;
  }
}
