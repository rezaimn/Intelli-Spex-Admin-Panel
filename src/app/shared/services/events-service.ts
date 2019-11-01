import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppHelper} from '../appHelper';
import {RequestOptions} from '@angular/http';

@Injectable()
export class EventsService {
    constructor(public http: HttpClient) {
    }
     AcctToken = '';



    addEvent(body): Observable<any> {

        return this.http.post(`${AppHelper.APIUrl}event`, body);
    }

    updateEvent(body, id): Observable<any> {
        return this.http.put(`${AppHelper.APIUrl}event/${id}`, body);
    }

    addEventTemplate(body): Observable<any> {

        return this.http.post(`${AppHelper.APIUrl}template`, body);
    }

    updateEventTemplate(body, id): Observable<any> {

        return this.http.put(`${AppHelper.APIUrl}template/${id}`, body);
    }
    updateAttachments(body): Observable<any> {
        return this.http.post(`${AppHelper.APIUrl}attachment/update`,body);
    }
    changeEventStatus(eventId): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}event/status/${eventId}`);
    }
    getEventReportLink(eventId: number): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}report/event/${eventId}`);
    }
    //
    // downloadEventReport(reportLink: string): Observable<any> {
    //     return this.http.get(`${AppHelper.APIUrl}attachment/download/reports/${reportLink}`);
    // }

    getEventList(pageNumber: number): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}event?page=${pageNumber}`);
    }

    getEventById(id): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}event/${id}`);
    }

    getTemplateById(id): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}template/${id}`);
    }

    getEventTemplateList(pageNumber: number): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}template?page=${pageNumber}`);
    }

    getEventTemplateListDropDown(): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}template`);
    }

    getTemplateItems(): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}event`);
    }

    deleteEvent(id): Observable<any> {
        return this.http.delete(`${AppHelper.APIUrl}event/${id}`);
    }

    deleteEventٍTemplate(id): Observable<any> {
        return this.http.delete(`${AppHelper.APIUrl}template/${id}`);
    }

    searchEvent(search): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}search/events?q=${search}`);
    }
    searchTemplates(search): Observable<any> {
        return this.http.get(`${AppHelper.APIUrl}search/templates?q=${search}`);
    }
    getSectionPosts(sectionId,pageNumber): Observable<any>{
        return this.http.get(`${AppHelper.APIUrl}post?section_id=${sectionId}&page=${pageNumber}`);
    }
    addPost(body): Observable<any> {

        return this.http.post(`${AppHelper.APIUrl}post`, body);
    }
    addPostComment(body): Observable<any> {

        return this.http.post(`${AppHelper.APIUrl}post/comment`, body);
    }
    getPostComments(postId,pageNumber): Observable<any>{
        return this.http.get(`${AppHelper.APIUrl}post/comment/${postId}?page=${pageNumber}`);
    }
    downloadAttachment(name){
        this.http.get(`${AppHelper.APIUrl}attachment/download/${name}?force`);
    }
    postLike(postId): Observable<any> {

        return this.http.get(`${AppHelper.APIUrl}post/like/${postId}`);
    }

    addEventComment(body): Observable<any> {

        return this.http.post(`${AppHelper.APIUrl}event/comment`, body);
    }
    getEventComments(eventId,pageNumber): Observable<any>{
        return this.http.get(`${AppHelper.APIUrl}event/comment/${eventId}?page=${pageNumber}`);
    }


    eventLike(eventId): Observable<any> {

        return this.http.get(`${AppHelper.APIUrl}event/like/${eventId}`);
    }
}
