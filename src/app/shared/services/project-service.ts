import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppHelper} from '../appHelper';

@Injectable()
export class ProjectsService {
    constructor(public http: HttpClient) {
    }

    getProjectEventsByProjectId(projectId , pageNumber): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}project/${projectId}/events?page=${pageNumber}`);
    }

    addProject(model): Observable<any> {
        return this.http.post(`${AppHelper.APIUrl}project`, model);
    }
    addEvent(model): Observable<any> {
        const addProjectModel = new FormData();
        addProjectModel.append('name', model);
        return this.http.post(`${AppHelper.APIUrl}project`, { name: model });
    }
    getProjectList(pageNumber: number, type?: string): Observable<any> {
        if (type && type === 'all') {
            return this.http.get(`${AppHelper.APIUrl}project?all=1`);
        } else {
            return this.http.get(`${AppHelper.APIUrl}project?page=${pageNumber}`);
        }
    }
    changeProjectStatus(id): Observable<any> {
        return this.http.put(`${AppHelper.APIUrl}project/status/${id}`, {});
    }
    getProjectEvents(id, pageNumber): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}project/${id}/events?page=${pageNumber}`);
    }
    getProjectUsers(id, pageNumber): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}project/${id}/users?page=${pageNumber}`);
    }

    deleteProject(id): Observable<any> {
        return this.http.delete(`${AppHelper.APIUrl}project/${id}`);
    }
    deleteProjectEevent(Pid, Eid): Observable<any> {
        const EventDeleteModel = new FormData();
        EventDeleteModel.append('project_id', Pid);
        EventDeleteModel.append('event_id[0]', Eid);
        EventDeleteModel.append('action', '0');
        return this.http.post(`${AppHelper.APIUrl}project/event`, {
            'project_id': Pid,
            'event_id[0]': Eid,
            'action': 1,
        });
    }
    deleteProjectUser(Pid, Uid): Observable<any> {
        const UserDeleteModel = new FormData();
        UserDeleteModel.append('project_id', Pid);
        UserDeleteModel.append('user_id[0]', Uid);
        UserDeleteModel.append('action', '0');
        return this.http.post(`${AppHelper.APIUrl}project/user`, {
            'project_id': Pid,
            'user_id[0]': Pid,
            'action': 1,
        });
    }
    searchProject(search): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}search/projects?q=${search}`);
    }
}
