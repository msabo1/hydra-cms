import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { ErrorsService } from './errors.service'
import { Payload } from '../models/payload.model';
import { UsersService } from './users.service';
@Injectable()
export class AuthService {
  loggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  token: Token;
  payload: Payload;
  constructor(
    private readonly usersService: UsersService,
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
  }

  getLoggedUser(): Observable<User>{
    return this.usersService.getById(this.payload.userId, {cascade: 'true'});
  }
}
