import { Routes } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEventsComponent } from './project-events/project-events.component';
import { ProjectUsersComponent } from './project-users/project-users.component';
import { CreateProjectComponent } from './create-projects/create-project.component';
import {ReportComponent} from '../report/report.component';
import {ProjectsComponent} from './projects.component';

export const ProjectsRoutes: Routes = [

  {
    path: '',
    component: ProjectsComponent,
    children: [
      {path: '', redirectTo: 'project-list', pathMatch: 'prefix'},
      {
        path: 'project-list',
        component: ProjectListComponent
      },
      {
        path: 'addProject',
        component: CreateProjectComponent
      },
      {
        path: 'addProject/:id',
        component: CreateProjectComponent
      },
      {
        path: 'project-list/:id/events',
        component: ProjectEventsComponent
      },
      {
        path: 'project-list/:id/users',
        component: ProjectUsersComponent
      }
    ]
  }
];
