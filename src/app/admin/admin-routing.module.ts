import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PreferencesComponent } from './preferences/preferences.component';

const routes: Routes = [
  {path:'', component:AdminHomeComponent},
  {path: 'users', component: UsersComponent},
  {path:'roles', component:RolesComponent},
  {path: 'preferences', component: PreferencesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }