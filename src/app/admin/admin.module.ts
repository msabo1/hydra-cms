import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { AdminComponent } from './admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { RolesComponent } from './roles/roles.component';
import { ListRolesComponent } from './roles/list-roles/list-roles.component';
import { MaterialModule } from './material.module';
import { CoreModule } from '../core/core.module';
import { DeleteRoleComponent } from './roles/delete-role/delete-role.component';
import { UpdateRoleComponent } from './roles/update-role/update-role.component';
import { PrivilegesComponent } from './roles/privileges/privileges.component';
import { CreateRoleComponent } from './roles/create-role/create-role.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { PagesComponent } from './pages/pages.component';
import { ListPagesComponent } from './pages/list-pages/list-pages.component';

@NgModule({
  declarations: [UsersComponent, ListUsersComponent, AdminComponent, AdminHomeComponent, CreateUserComponent, UpdateUserComponent, DeleteUserComponent, RolesComponent, ListRolesComponent, DeleteRoleComponent, UpdateRoleComponent, PrivilegesComponent, CreateRoleComponent, PreferencesComponent, PagesComponent, ListPagesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    CoreModule,
    MaterialModule
    
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
