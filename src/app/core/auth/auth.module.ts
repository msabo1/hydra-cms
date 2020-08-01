import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { PrivilegeAuthDirective } from './privilege-auth.directive';

@NgModule({
  declarations: [PrivilegeAuthDirective],
  imports: [
    CommonModule,

  ],
  providers: [AuthService],
  exports: [AuthService, PrivilegeAuthDirective]
})
export class AuthModule { }
