import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppHelper} from '../appHelper';

@Injectable()
export class ClientService {
    constructor(public http: HttpClient) {
    }

    addClient(body): Observable<any> {
        return this.http.post(`${AppHelper.APIUrl}client`, body);
    }
    updateClient(body,id): Observable<any> {
        return this.http.put(`${AppHelper.APIUrl}client/${id}`, body);
    }
    getClientList(pageNumber: number, type?: string): Observable<any> {
        // if (type && type === 'all') {
        //     return this.http.get(`${AppHelper.APIUrl}client`);
        // } else {
            return this.http.get(`${AppHelper.APIUrl}client?page=${pageNumber}`);
        // }
    }
    getClientById(id: number,): Observable<any> {
        // if (type && type === 'all') {
        //     return this.http.get(`${AppHelper.APIUrl}client`);
        // } else {
        return this.http.get(`${AppHelper.APIUrl}client/${id}`);
        // }
    }
    changeClientStatus(id): Observable<any> {
        return this.http.put(`${AppHelper.APIUrl}client/status/${id}`, {});
    }

    deleteClient(id): Observable<any> {
        return this.http.delete(`${AppHelper.APIUrl}client/${id}`);
    }

    searchProject(search): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}search/projects?q=${search}`);
    }
}
