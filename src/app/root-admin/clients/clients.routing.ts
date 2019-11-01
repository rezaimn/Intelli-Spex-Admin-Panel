import { Routes } from '@angular/router';


import {ReportComponent} from '../../report/report.component';
import {ClientsComponent} from './clients.component';
import {ClientListComponent} from './client-list/client-list.component';
import {CreateClientComponent} from './create-client/create-client.component';

export const ClientRoutes: Routes = [

  {
    path: '',
    component: ClientsComponent,
    children: [
      {path: '', redirectTo: 'client-list', pathMatch: 'prefix'},
      {
        path: 'client-list',
        component: ClientListComponent
      },
      {
        path: 'create-client',
        component: CreateClientComponent
      },
      {
        path: 'create-client/:id',
        component: CreateClientComponent
      }
    ]
  }
];
