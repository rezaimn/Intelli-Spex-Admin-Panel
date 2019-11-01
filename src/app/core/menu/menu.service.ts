import {Injectable} from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}

export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: 'root-admin/dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'explore'
    }, {
        state: 'root-admin/clients',
        name: 'Clients',
        type: 'link',
        icon: 'business'
    }, {
        state: 'root-admin/user-list',
        name: 'Users',
        type: 'link',
        icon: 'person'
    },
    {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'explore'
    }, {
        state: 'events',
        name: 'Events',
        type: 'link',
        icon: 'date_range'
    }, {
        state: 'users',
        name: 'Users',
        type: 'link',
        icon: 'person'
    }, {
        state: 'projects',
        name: 'Projects',
        type: 'link',
        icon: 'list_alt'
    }, {
        state: 'reports',
        name: 'Reports',
        type: 'link',
        icon: 'insert_chart_outlined'
    }, {
        state: 'signout',
        name: 'Sign out',
        type: 'link',
        icon: 'exit_to_app'
    },
];

@Injectable()
export class MenuService {

    getAll(): Menu[] {
        let selectedMenu = [];
        let role = localStorage.getItem('role');
        if (role == 'Root Admin') {
            selectedMenu = MENUITEMS.filter(item => {
                return item.state == 'root-admin/dashboard' || item.state == 'root-admin/clients' ||item.state == 'signout';//|| item.state == 'root-admin/user-list'
            });
        } else {
            selectedMenu = MENUITEMS.filter(item => {
                return item.state != 'root-admin/dashboard' && item.state != 'root-admin/clients' && item.state != 'root-admin/user-list';
            });
        }
        return selectedMenu;
    }

    add(menu) {
        MENUITEMS.push(menu);
    }
}
