import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {ProjectListComponent} from './project-list/project-list.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CreateProjectComponent} from './create-projects/create-project.component';
import {ProjectEventsComponent} from './project-events/project-events.component';
import {ProjectUsersComponent} from './project-users/project-users.component';
import {RouterModule} from '@angular/router';
import {ProjectsRoutes} from './projects.routing';
import {AppMaterialModule} from '../app-material-module';
import { ProjectsService } from '../shared/services/project-service';
import { AddEventModalComponent } from './project-events/add-events-modal.component';
import { EventsService } from '../shared/services/events-service';
import { UsersService } from '../shared/services/users-service';
import {ProjectsComponent} from './projects.component';
import {AddUsersModalComponent} from './project-users/add-users-modal.component';


@NgModule({
    entryComponents: [
        AddEventModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        AppMaterialModule,
        RouterModule.forChild(ProjectsRoutes)
    ],
    providers: [
        ProjectsService,
        EventsService,
        UsersService
    ],
    declarations: [
        ProjectListComponent,
        CreateProjectComponent,
        ProjectEventsComponent,
        AddEventModalComponent,
        ProjectUsersComponent,
        ProjectsComponent,
        AddUsersModalComponent
    ],
})
export class ProjectsModule {
}
