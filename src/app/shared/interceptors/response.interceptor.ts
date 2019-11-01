import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {MessageBoxComponent} from '../messageBox';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(private messageBox: MessageBoxComponent,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let AcctToken = '';

        if (typeof window !== 'undefined') {
            AcctToken = localStorage.getItem('token');
        }
        let req;

        switch (true) {
            case request.url.includes('token'):
                req = request.clone({
                    setHeaders: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                break;

            case request.url.includes('event')||request.url.includes('attachment/update'
            )||request.url.includes('post'):
                req = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${AcctToken}`,
                    }
                });
                break;
            case request.url.includes('template'):
                req = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${AcctToken}`,

                    }
                });
                break;
            default:
                req = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${AcctToken}`,
                        'Content-Type': 'application/json',
                    }
                });
        }

        return next.handle(req).pipe(catchError((error: any) => {
            let err;
            const status = error.status;
            // console.log(error,"fffffffffffffffffffffffff",typeof error.error.result);
            if(error.error){
                if(typeof error.error.result==='object'){
                    this.messageBox.showError('Error', error.error.result[0].message);
                    err = error.error.result[0].message;
                } if(typeof error.error.result==='string'){
                    this.messageBox.showError('Error', error.error.result);
                    err = error.error.result;
                }
            }
           else{
                this.messageBox.showError('Error', error.result);
                err = error.result;
            }


            // switch (status) {
            //     case 401 : {
            //         this.messageBox.showError(null, 'Token Expired');
            //         err = 'Authentication Error';
            //         this.router.navigate(['/signin']);
            //         break;
            //     }
            //     case 403 || 500: {
            //         this.messageBox.showError(null, 'Operation is failed.');
            //         err = 'System Error';
            //         break;
            //     }
            //     case 400: {
            //         this.messageBox.showError('Error', error.error.result[0].message);
            //         err = error.error.result[0].message;
            //         break;
            //     }
            //     case 422: {
            //         this.messageBox.showError(null, error.error.result);
            //         err = error.error.result;
            //         break;
            //     }
            //     case 500: {
            //         this.messageBox.showError(null, error.error.result);
            //         err = error.error.result;
            //         break;
            //     }
            // }

            return throwError(err);
        }));
    }
}
