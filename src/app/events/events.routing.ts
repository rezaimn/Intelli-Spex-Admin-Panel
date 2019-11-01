import {Routes} from '@angular/router';

import {EventListComponent} from './event-list/event-list.component';
import {CreateEventComponent} from './create-event/create-event.component';
import {EventsComponent} from './events.component';
import {EventSectionsComponent} from './event-sections/event-sections.component';
import {CreatePostComponent} from './event-sections/create-post/create-post.component';
import {EventCommentsComponent} from './event-comments/event-comments.component';

export const EventsRoutes: Routes = [
    {
        path: '',
        component: EventsComponent,
        children: [
            {path: '', redirectTo: 'event-list', pathMatch: 'prefix'},

            {
                path: 'event-list',
                component: EventListComponent
            }, {
                path: 'addEvent',
                component: CreateEventComponent
            }, {
                path: 'addEvent/:id',
                component: CreateEventComponent
            }, {
                path: 'event-sections/:id',
                component: EventSectionsComponent
            }, {
                path: 'event-comments/:id',
                component: EventCommentsComponent
            }, {
                path: 'create-post/:eventId/:sectionId',
                component: CreatePostComponent
            }
            ]
    }

];
