import {Routes} from '@angular/router';

import {EventTemplateListComponent} from './event-template-list/event-template-list.component';
import {CreateEventTemplateComponent} from './create-event-template/create-event-template.component';
import {UsersComponent} from '../users/users.component';
import {TemplatesComponent} from './templates.component';

export const TemplateRoutes: Routes = [

    {
        path: '',
        component: TemplatesComponent,
        children: [
            {path: '', redirectTo: 'templateList', pathMatch: 'prefix'},
            {
                path: 'templateList',
                component: EventTemplateListComponent
            }, {
                path: 'addTemplate',
                component: CreateEventTemplateComponent
            }, {
                path: 'addTemplate/:id',
                component: CreateEventTemplateComponent
            }
        ]
    }
];
