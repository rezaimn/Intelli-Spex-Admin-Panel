import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {RouterModule} from '@angular/router';
import {AppMaterialModule} from '../../app-material-module';
import { ProjectsService } from '../../shared/services/project-service';
import { EventsService } from '../../shared/services/events-service';
import { UsersService } from '../../shared/services/users-service';
import {ClientsComponent} from './clients.component';
import {ClientListComponent} from './client-list/client-list.component';
import {CreateClientComponent} from './create-client/create-client.component';
import {ClientRoutes} from './clients.routing';
import {ClientService} from '../../shared/services/client-service';


@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        AppMaterialModule,
        RouterModule.forChild(ClientRoutes)
    ],
    providers: [
        ProjectsService,
        EventsService,
        UsersService,
        ClientService
    ],
    declarations: [
        ClientListComponent,
        CreateClientComponent,
        ClientsComponent,
    ],
})
export class ClientsModule {
}
