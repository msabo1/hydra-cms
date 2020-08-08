import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Token } from '../../models/token.model';
import { User } from '../../core/users/user.model';
import { MessagesService } from '../messages/messages.service'
import { Payload } from '../../models/payload.model';
import { UsersService } from '../../core/users/users.service';
import { Role } from '../roles/role.model';
import { PreferencesService } from '../../core/preferences/preferences.service';
import { Preferences } from '../preferences/preferences.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser: BehaviorSubject<Partial<User>> = new BehaviorSubject<Partial<User>>({role: new Role()});
  token: Token;
  payload: Payload;

  private preferencesSubscription: Subscription;

  constructor(
    private readonly usersService: UsersService,
    private readonly http: HttpClient,
    private readonly messagesService: MessagesService,
    private readonly preferencesService: PreferencesService
  ){
    this.token = new Token();
    this.token.token = localStorage.token;
    if(this.token.isValid()){
      this.payload = this.token.parse();
      this.loadLoggedUser();
    }else{
        this.subscribeToPreferences();
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
    if(this.preferencesSubscription){
      this.preferencesSubscription.unsubscribe();
      this.preferencesSubscription = null;
    }
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
    if(!this.preferencesSubscription){
      this.subscribeToPreferences();
    }
  }

  getLoggedUser(): Observable<User>{
    return this.usersService.getById(this.payload.userId, {cascade: 'true'});
  }

  hasPrivilege(permission: string, group: string): boolean{
    return this.loggedUser.value.role.hasPrivilege(permission, group);
  }

  private loadLoggedUser(){
    const user: User = JSON.parse(localStorage.loggedUser);
    user.role = new Role(user.role);
    this.loggedUser.next(user);
  }

  private subscribeToPreferences(){
    this.preferencesSubscription = this.preferencesService.preferences.subscribe((preferences: Preferences) => this.loggedUser.next({role: preferences.visitorRole}));
  }
}
