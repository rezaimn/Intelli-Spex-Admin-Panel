
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }
}

import { SsoService } from './sso.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _authService: SsoService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated()) {
      return true;
    }

    // navigate to login page
    this._router.navigate(['/signin']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
