import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PrivilegesService {

  constructor(private readonly http: HttpClient) { }

  getPermissions(): Observable<{name: string}[]>{
    return this.http.get<{name: string}[]>('api/permissions');
  }

  getGroups(): Observable<{name: string}[]>{
    return this.http.get<{name: string}[]>('api/groups');
  }
}
