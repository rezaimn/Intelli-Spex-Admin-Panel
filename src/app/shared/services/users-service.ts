import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppHelper} from '../appHelper';

@Injectable()
export class UsersService {
    constructor(public http: HttpClient) {
    }

    addUser(model): Observable<any> {
        const addUserModel = new FormData();
        addUserModel.append('template', model.template);
        addUserModel.append('templateId', model.templateId);
        addUserModel.append('locationType', model.locationType);
        addUserModel.append('coordinate', model.coordinate);
        addUserModel.append('address', model.address);
        addUserModel.append('UserName', model.UserName);
        addUserModel.append('sections', model.sections);
        addUserModel.append('photo', model.photo);
        addUserModel.append('attachments', model.attachments);
        return this.http.post(`${AppHelper.APIUrl}users`, addUserModel);
    }
    addUserToGroup(id, model): Observable<any> {
        // const addUserModel = new FormData();
        // addUserModel.append('group_id', id);
        // model.map((m, i) => addUserModel.append(`users[i]`, m.id));
        return this.http.post(`${AppHelper.APIUrl}group/users`, {
            group_id: id,
            users: model
        });
    }
    createGroup(name): Observable<any> {
        const addUserModel = new FormData();
        addUserModel.append('name', name);
        return this.http.post(`${AppHelper.APIUrl}group`, {name});
    }
    getUserListForGroup(pageNumber: number): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}users/list?role=4&page=${pageNumber}`);
    }
    getUserList(pageNumber: number): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}users/list?page=${pageNumber}`);
    }
    getUsersByRole(roleId): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}users/list?role=${roleId}`);
    }
    getUserById(id): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}users/${id}`);
    }
    searchUsers(search): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}search/users?q=${search}`);
    }
    deleteUser(body): Observable<any> {
        return this.http.delete(`${AppHelper.APIUrl}users/removeUser`,body);
    }
    getGroupList(): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}group`);
    }
    getGroupUserList(id): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}group/users/${id}`);
    }
}
