import {Routes} from '@angular/router';
import {AuthGuard} from '../shared/services/auth-guard.service';
import {DashboardComponent} from './dashboard.component';
import {ReportComponent} from '../report/report.component';

export const DashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'prefix'},
            {
                path: '',
                component: DashboardComponent,
                canActivate: [AuthGuard]
            }]
    }
];
