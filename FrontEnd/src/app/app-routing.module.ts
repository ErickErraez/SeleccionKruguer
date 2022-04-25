import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: 'web',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren:() => import('./layout/layout.module').then(m => m.LayoutModule)
      }],
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'web'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
