import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Preferences } from './preferences.model';
import { Role } from '../roles/role.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private url: string = 'api/preferences';

  preferences: BehaviorSubject<Partial<Preferences>> = new BehaviorSubject<Partial<Preferences>>({visitorRole: new Role()});

  constructor(
    private readonly http: HttpClient,
    @Inject('directHttp') private readonly directHttp: HttpClient
  ){
    this.get().subscribe((preferences: Preferences) => this.preferences.next(preferences));
  }

  get(): Observable<Preferences>{
    return this.directHttp.get<Preferences>(this.url).pipe(map((preferences: Preferences): Preferences => {
      preferences.defaultRole = new Role(preferences.defaultRole);
      preferences.visitorRole = new Role(preferences.visitorRole);
      return preferences;
    }));
  }
}
