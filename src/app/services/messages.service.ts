import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message: Subject<string> = new Subject<string>();
  successMessage: Subject<string> = new Subject<string>();
  errorMessage: Subject<string> = new Subject<string>();
  
  constructor() { }

  handleHttpError(error): Observable<any>{
    console.log(error);
    this.errorMessage.next(error.error.message);
    return of();
  }
}
