import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { AdminComponent } from './admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { UpdatePageComponent } from './pages/update-page/update-page.component';
import { DeletePageComponent } from './pages/delete-page/delete-page.component';
import { PostsComponent } from './posts/posts.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';
import { DeletePostComponent } from './posts/delete-post/delete-post.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';

@NgModule({
  declarations: [UsersComponent, ListUsersComponent, AdminComponent, AdminHomeComponent, CreateUserComponent, UpdateUserComponent, DeleteUserComponent, RolesComponent, ListRolesComponent, DeleteRoleComponent, UpdateRoleComponent, PrivilegesComponent, CreateRoleComponent, PreferencesComponent, PagesComponent, ListPagesComponent, CreatePageComponent, UpdatePageComponent, DeletePageComponent, PostsComponent, CreatePostComponent, UpdatePostComponent, DeletePostComponent, ListPostsComponent],
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
