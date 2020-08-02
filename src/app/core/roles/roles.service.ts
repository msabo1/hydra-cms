import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service';
import { QueryResponse } from '../models/query-response.model';
import { Role } from './role.model';
import { QueryRolesDto } from './dto/query-roles.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

  url: string = '/api/roles'

  constructor(
    private readonly http: HttpClient,
    private readonly messagesService: MessagesService
    ) { }

  get(query?: QueryRolesDto): Observable<QueryResponse<Role>>{
    const params: HttpParams = new HttpParams({fromObject: query as {[param: string]: string}});
    return this.http.get<Role[]>(this.url, {params, observe: 'response'})
      .pipe(
        map((response: HttpResponse<Role[]>): QueryResponse<Role> => {
          response.body.forEach(this.mapResponseToRoleModel);
          return {data: response.body, total: Number(response.headers.get('Pagination-Count'))};
        }),
        catchError(error => this.messagesService.handleHttpError(error))
      );
  }

  getById(id: string, query?: {cascade: 'true' | 'false'}): Observable<Role>{
    const params: HttpParams =  new HttpParams({fromObject: query});
    return this.http.get<Role>(`${this.url}/${id}`,{params})
      .pipe(
        map(this.mapResponseToRoleModel),
        catchError(error => this.messagesService.handleHttpError(error))
      );
  }

  create(createRoleDto: CreateRoleDto): Observable<Role>{
    return this.http.post<Role>(this.url, createRoleDto).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  update(id: string, updateRoleDto: UpdateRoleDto): Observable<Role>{
    return this.http.patch<Role>(`${this.url}/${id}`, updateRoleDto).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  delete(id: string){
    return this.http.delete(`${this.url}/${id}`).pipe(catchError(error => this.messagesService.handleHttpError(error)));
  }

  private mapResponseToRoleModel(role: Role): Role{
   return new Role(role);
  }
}