import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import {MatTableModule} from '@angular/material/table';
import { AdminComponent } from './admin.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateUserComponent } from './users/create-user/create-user.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { AuthModule } from '../auth/auth.module';
import { RolesComponent } from './roles/roles.component';
import { ListRolesComponent } from './roles/list-roles/list-roles.component';

@NgModule({
  declarations: [UsersComponent, ListUsersComponent, AdminComponent, AdminHomeComponent, CreateUserComponent, UpdateUserComponent, DeleteUserComponent, RolesComponent, ListRolesComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatTooltipModule,
    AuthModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
