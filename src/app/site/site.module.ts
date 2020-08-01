import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SiteComponent } from './site.component';
import { LoginFormComponent } from './login-form/login-form.component';



@NgModule({
  declarations: [SiteComponent, LoginFormComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [SiteComponent]
})
export class SiteModule { }
