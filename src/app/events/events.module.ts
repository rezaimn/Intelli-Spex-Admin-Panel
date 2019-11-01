import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EventListComponent} from './event-list/event-list.component';
import {CreateEventComponent} from './create-event/create-event.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {EventsRoutes} from './events.routing';
import {AppMaterialModule} from '../app-material-module';
import {DndModule} from 'ngx-drag-drop';
import {EventsService} from '../shared/services/events-service';
import {DialogueModule} from '../shared/modules/remove-dialogue/dialogue.module';
import { ProjectsService } from '../shared/services/project-service';
import { SsoService } from '../shared/services/sso.service';
import {GetProjectByIdPipe} from '../shared/pipes/get-project-by-id.pipe';
import {EventsComponent} from './events.component';
import {EventSectionsComponent} from './event-sections/event-sections.component';
import {CreatePostComponent} from './event-sections/create-post/create-post.component';

import {SharedModule} from '../shared/modules/shared.module';
import {EventCommentsComponent} from './event-comments/event-comments.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        DndModule,
        DialogueModule,
        RouterModule.forChild(EventsRoutes),
        SharedModule,
        AppMaterialModule,
    ],
    declarations: [
        EventListComponent,
        CreateEventComponent,
        GetProjectByIdPipe,
        EventsComponent,
        EventSectionsComponent,
        CreatePostComponent,
        EventCommentsComponent
    ],
    providers: [
        SsoService,
        EventsService,
        ProjectsService
    ],
    entryComponents: [
    ],
})
export class EventsModule {
}
