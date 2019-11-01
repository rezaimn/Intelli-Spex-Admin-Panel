import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {RouterModule} from '@angular/router';
import {RootAdminRoutes} from './root-admin.routing';
import {AppMaterialModule} from '../app-material-module';
import { ProjectsService } from '../shared/services/project-service';
import { EventsService } from '../shared/services/events-service';
import { UsersService } from '../shared/services/users-service';
import {RootAdminComponent} from './root-admin.component';
import {UsersComponent} from './users/users.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartsModule} from 'ng2-charts';
import {UserListComponent} from '../users/user-list/user-list.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        AppMaterialModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatProgressBarModule,
        MatMenuModule,
        FlexLayoutModule,
        ChartsModule,
        RouterModule.forChild(RootAdminRoutes)
    ],
    providers: [
        ProjectsService,
        EventsService,
        UsersService
    ],
    declarations: [
        UsersComponent,
        DashboardComponent,
        RootAdminComponent,


    ],
    entryComponents:[]
})
export class RootAdminModule {
}
