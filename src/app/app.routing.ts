import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { RegisterComponent } from './views/register/register.component';
import { SupportComponent } from './views/support/support.component';
import { ConfirmComponent } from './views/confirm/confirm.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Loading...'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'User Register Page'
    }
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
    data: {
      title: 'User Confirmation'
    }
  },
  {
    path: 'support',
    component: SupportComponent,
    data: {
      title: 'Chemium IMS | Technical Support'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'record',
        loadChildren: () => import('./views/record/record.module').then(m => m.RecordModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./views/report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./views/register/register.module').then(m => m.RegisterModule)
      }

    ],
    //canActivate: [AuthGuard]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
