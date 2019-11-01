import {AppHelper} from '../appHelper';
import {Injectable, } from '@angular/core';
import {SigninModel} from '../models/signin.model';
import {SignupModel} from '../models/signup.model';
import {TServiceResult} from '../infrastructure/TServiceResult';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {SigninResultModel} from '../models/signin-result.model';
import { observable } from 'rxjs';

@Injectable()
export class SsoService {
    constructor(public http: HttpClient, private router: Router) {
    }
    isAuthenticated(): boolean {
        if(localStorage.getItem('token')==''||localStorage.getItem('token')==undefined||localStorage.getItem('token')==null){
            return false;
        }else{
            return true;
        }



    }
    login(model: SigninModel): Observable<TServiceResult<SigninResultModel>> {
        return this.http.post<TServiceResult<SigninResultModel>>(AppHelper.APIUrl + 'users/signin', model);
    }
    signup(model: SignupModel): Observable<any> {
        return this.http.post(AppHelper.APIUrl + 'users/signup', model);
    }
    getImage(model): Observable<Blob> {
        return this.http.get(AppHelper.APIUrl + 'attachment/download/' + model, { responseType: 'blob' });
    }
}
