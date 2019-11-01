import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {ReportProjectListComponent} from './report-project-list/report-project-list.component';
import {RouterModule} from '@angular/router';
import {ReportRoutes} from './report.routing';
import {AppMaterialModule} from '../app-material-module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { ProjectsService } from '../shared/services/project-service';
import {ProjectEventListComponent} from './project-event-list/project-event-list.component';
import {DataSharingService} from '../shared/services/data-sharing.service';
import {EventsService} from '../shared/services/events-service';
import {ReportComponent} from './report.component';
import {GetEventDownloadLinkByIdPipe} from '../shared/pipes/get-event-download-link-by-id.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        AppMaterialModule,
        RouterModule.forChild(ReportRoutes),

    ],
    providers:[
        ProjectsService,
        DataSharingService,
        EventsService,
    ],
    declarations: [
        ReportProjectListComponent,
        ProjectEventListComponent,
        ReportComponent,
        GetEventDownloadLinkByIdPipe
    ]
})
export class ReportModule {
}
