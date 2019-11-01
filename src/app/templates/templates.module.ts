import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EventTemplateListComponent} from './event-template-list/event-template-list.component';
import {CreateEventTemplateComponent} from './create-event-template/create-event-template.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {DndModule} from 'ngx-drag-drop';
import {TemplateRoutes} from './templates.routing';
import {AppMaterialModule} from '../app-material-module';
import {EventsService} from '../shared/services/events-service';
import {DeleteDataDialogComponent} from './event-template-list/deletedata.dialog.component';
import {DialogueModule} from '../shared/modules/remove-dialogue/dialogue.module';
import {TemplatesComponent} from './templates.component';
import {SharedModule} from '../shared/modules/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(TemplateRoutes),
        NgxDatatableModule,
        DialogueModule,
        DndModule,
        SharedModule,
        AppMaterialModule,
    ],
    declarations: [
        EventTemplateListComponent,
        CreateEventTemplateComponent,
        DeleteDataDialogComponent,
        TemplatesComponent
    ],
    providers: [EventsService],
    entryComponents: [DeleteDataDialogComponent]
})
export class TemplatesModule {
}
