import {Routes} from '@angular/router';
import {ReportProjectListComponent} from './report-project-list/report-project-list.component';
import {ProjectEventListComponent} from './project-event-list/project-event-list.component';
import {ReportComponent} from './report.component';


export const ReportRoutes: Routes = [
    {
        path: '',
        component: ReportComponent,
        children: [
            {path: '', redirectTo: 'report-projects', pathMatch: 'prefix'},
            {
                path: 'report-projects',
                component: ReportProjectListComponent
            },
            {
                path: 'project-events',
                component: ProjectEventListComponent
            },
            {
                path: 'project-events/:id',
                component: ProjectEventListComponent
            }
        ]
    }


];
