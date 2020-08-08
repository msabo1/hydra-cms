import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module'
import { PrivilegesModule } from './privileges/privileges.module';
import { PreferencesModule } from './preferences/preferences.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    MessagesModule,
    RolesModule,
    UsersModule,
    PrivilegesModule,
    PreferencesModule
  ],
  exports: [
    AuthModule,
    MessagesModule,
    RolesModule,
    UsersModule,
    PrivilegesModule,
    PreferencesModule
  ]
})
export class CoreModule { }
