import {Routes} from '@angular/router';

import {CreateUserGroupComponent} from './create-user-group/create-user-group.component';
import {UserGroupTabsComponent} from './user-group-tabs/user-group-tabs.component';
import {UserGroupsComponent} from './user-groups/user-groups.component';
import {UsersComponent} from './users.component';

export const UsersRoutes: Routes = [

    {
        path: '',
        component: UsersComponent,
        children: [
            {path: '', redirectTo: 'user-group', pathMatch: 'prefix'},
            {
                path: 'user-group',
                component: UserGroupTabsComponent
            },
            {
                path: 'create-group',
                component: CreateUserGroupComponent
            },
            {
                path: 'create-group/:id',
                component: CreateUserGroupComponent
            },
            {
                path: 'groups',
                component: UserGroupsComponent
            }
        ]
    }
];
