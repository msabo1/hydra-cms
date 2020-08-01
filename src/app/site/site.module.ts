import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SiteComponent } from './site.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SiteRoutingModule } from './site-routing.module'
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [SiteComponent, LoginFormComponent],
  imports: [
    CommonModule,
    CoreModule,
    SiteRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [SiteComponent]
})
export class SiteModule { }
