import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { MessagesService } from './messages.service'
import { Payload } from '../models/payload.model';
import { UsersService } from './users.service';
import { Role } from '../models/role.model';
@Injectable()
export class AuthService {
  loggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  token: Token;
  payload: Payload;
  constructor(
    private readonly usersService: UsersService,
    private readonly http: HttpClient,
    private readonly messagesService: MessagesService
  ){
    this.token = new Token();
    this.token.token = localStorage.token;
    if(this.token.isValid()){
      this.payload = this.token.parse();
      this.loadLoggedUser();
    }
  }

  private handleSuccessfulLogin(token: Token){
    this.token = token;
    localStorage.token = token.token;
    this.payload = token.parse();
    this.getLoggedUser().subscribe((user: User) => {
      this.loggedUser.next(user);
      localStorage.loggedUser = JSON.stringify(user);
    }); 
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
        catchError(error => this.messagesService.handleHttpError(error))
      );
  }

  logout(){
    delete localStorage.token;
    delete localStorage.loggedUser;
    this.token = null;
    this.payload = null;
    this.loggedUser.next(null);
  }

  getLoggedUser(): Observable<User>{
    return this.usersService.getById(this.payload.userId, {cascade: 'true'});
  }

  private loadLoggedUser(){
    const user: User = JSON.parse(localStorage.loggedUser);
    user.role = new Role(user.role);
    this.loggedUser.next(user);
  }
}
