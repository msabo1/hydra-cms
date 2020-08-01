import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {MatCardModule} from '@angular/material/card'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { PrivilegeAuthDirective } from './privilege-auth.directive';

@NgModule({
  declarations: [AuthComponent, LoginFormComponent, PrivilegeAuthDirective],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, UsersService],
  exports: [AuthComponent, PrivilegeAuthDirective]
})
export class AuthModule { }
