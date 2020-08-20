import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module'
import { PrivilegesModule } from './privileges/privileges.module';
import { PreferencesModule } from './preferences/preferences.module';
import { PagesModule, } from './pages/pages.module';
import { MdEditorModule } from './md-editor/md-editor.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    MessagesModule,
    RolesModule,
    UsersModule,
    PrivilegesModule,
    PreferencesModule,
    PagesModule,
    MdEditorModule
  ],
  exports: [
    AuthModule,
    MessagesModule,
    RolesModule,
    UsersModule,
    PrivilegesModule,
    PreferencesModule,
    PagesModule,
    MdEditorModule
  ]
})
export class CoreModule { }
