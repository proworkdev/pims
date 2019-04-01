import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}


  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
    }*/

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      const url: string = state.url;
      return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
    }

    checkLogin(url: string) {
      if (this.authService.isLoggedIn) {
        return true;
      }

      this.authService.redirectUrl = url;

      this.router.navigate(['/login'], {queryParams: { returnUrl: url }} );
    }
    
}
