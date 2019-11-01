import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserGroupsComponent} from './user-groups/user-groups.component';
import {UserListComponent} from './user-list/user-list.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AppMaterialModule} from '../app-material-module';
import {UsersService} from '../shared/services/users-service';
import {RouterModule} from '@angular/router';
import {UsersRoutes} from './users.routing';
import { CreateUserGroupComponent } from './create-user-group/create-user-group.component';
import {UserGroupTabsComponent} from './user-group-tabs/user-group-tabs.component';
import {DataSharingService} from '../shared/services/data-sharing.service';
import {UsersComponent} from './users.component';
import {IsUserInGroupPipe} from '../shared/pipes/is-user-in-group.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        AppMaterialModule,
        RouterModule.forChild(UsersRoutes)

    ],
    providers: [
        UsersService,
        DataSharingService
    ],
    declarations: [
        UserGroupsComponent,
        CreateUserGroupComponent,
        UserListComponent,
        UserGroupTabsComponent,
        UsersComponent,
        IsUserInGroupPipe
    ],
    entryComponents:[
        UserListComponent,
        UserGroupsComponent,
    ]
})
export class UsersModule {
}
