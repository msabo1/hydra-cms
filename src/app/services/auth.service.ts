import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { ErrorsService } from './errors.service'
import { Payload } from '../models/payload.model';
@Injectable()
export class AuthService {
  loggedUser: Subject<User> = new Subject();
  token: Token;
  payload: Payload;
  constructor(
    private readonly http: HttpClient,
    private readonly errorsService: ErrorsService
  ){
    this.token = new Token();
    this.token.token = localStorage.token;
    if(this.token.isValid()){
      this.payload = this.token.parse();
    }
  }

  private handleSuccessfulLogin(token: Token){
    this.token = token;
    localStorage.token = token.token;
    this.payload = token.parse();
    this.loadLoggedUser();
  }

  login(username: string, password: string): Observable<Token>{
    return this.http.post<Token>('/api/users/login', {username, password})
      .pipe(
        map((token: Token) => {
          const tkn = new Token();
          tkn.token = token.token;
          return tkn;
        }),
        tap((token: Token) => this.handleSuccessfulLogin(token)),
        catchError(error => this.errorsService.handleError(error))
      );
  }

  logout(){
    delete localStorage.token;
    this.token = null;
    this.payload = null;
    this.loggedUser.next(null);
  }

  loadLoggedUser(){
    const params: HttpParams =  new HttpParams({fromObject: {cascade: 'true'}});
    this.http.get<User>(`/api/users/${this.payload.userId}`,{params})
      .pipe(
        catchError(error => this.errorsService.handleError(error))
      ).subscribe(user => this.loggedUser.next(user));
  }
}
