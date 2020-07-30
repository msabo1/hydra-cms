import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message: Subject<any> = new Subject<any>();
  
  constructor() { }

  handleError(error): Observable<any>{
    console.log(error);
    this.message.next(error.error.message);
    return of();
  }
}
