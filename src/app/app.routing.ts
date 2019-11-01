import {Routes} from '@angular/router';
import {AuthGuard} from './shared/services/auth-guard.service';
import {AdminLayoutComponent, AuthLayoutComponent} from './core';

export const AppRoutes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'reports',
                loadChildren: './report/report.module#ReportModule'
            },
            {
                path: 'users',
                loadChildren: './users/users.module#UsersModule'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'root-admin',
                loadChildren: './root-admin/root-admin.module#RootAdminModule'
            },
            {
                path: 'templates',
                loadChildren: './templates/templates.module#TemplatesModule'
            },
            {
                path: 'projects',
                loadChildren: './projects/projects.module#ProjectsModule'
            },{
                path: 'events',
                loadChildren: './events/events.module#EventsModule'
            }
        ]
    }, {
        path: '**',
        redirectTo: 'session/404'

    }, {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: '',
            loadChildren: './session/session.module#SessionModule'
        }]
    }];
