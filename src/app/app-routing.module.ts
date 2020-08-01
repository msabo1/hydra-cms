import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { SiteComponent } from './site/site.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '', component: SiteComponent, loadChildren: () => import('./site/site.module').then(m => m.SiteModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
