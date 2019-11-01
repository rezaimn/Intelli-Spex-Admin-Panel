import { Routes } from '@angular/router';

import {RootAdminComponent} from './root-admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UsersComponent} from './users/users.component';
import {ClientsComponent} from './clients/clients.component';

export const RootAdminRoutes: Routes = [

  {
    path: '',
    component: RootAdminComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'user-list',
        component: UsersComponent
      },
      {
        path: 'clients',
        loadChildren: './clients/clients.module#ClientsModule'
      }
    ]
  }
];
