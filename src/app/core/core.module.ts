import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module'
import { PrivilegesModule } from './privileges/privileges.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    MessagesModule,
    RolesModule,
    UsersModule,
    PrivilegesModule
  ],
  exports: [
    AuthModule,
    MessagesModule,
    RolesModule,
    UsersModule,
    PrivilegesModule
  ]
})
export class CoreModule { }
