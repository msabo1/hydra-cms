import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesService } from './preferences.service';
import { HttpClient, HttpBackend, HttpXhrBackend } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
   {provide: 'directHttp', useFactory: (httpBackend: HttpBackend) => new HttpClient(httpBackend), deps: [HttpBackend]}
  ]
})
export class PreferencesModule { }
