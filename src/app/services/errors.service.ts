import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  error: Subject<any> = new Subject<any>();
  
  constructor() { }

  handleError(error): Observable<any>{
    console.log(error);
    this.error.next(error.error);
    return of();
  }
}
