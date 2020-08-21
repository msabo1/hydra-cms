import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { PagesComponent } from './pages/pages.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { UpdatePageComponent } from './pages/update-page/update-page.component';
import { PostsComponent } from './posts/posts.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { UpdateCategoryComponent } from './categories/update-category/update-category.component';

const routes: Routes = [
  {path:'', component:AdminHomeComponent},
  {path: 'users', component: UsersComponent},
  {path:'roles', component:RolesComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: 'pages/update/:id', component: UpdatePageComponent},
  {path: 'pages/new', component: CreatePageComponent},
  {path: 'pages', component: PagesComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'posts/new', component: CreatePostComponent},
  {path: 'posts/update/:id', component: UpdatePostComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/new', component: CreateCategoryComponent},
  {path: 'categories/update/:id', component: UpdateCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }