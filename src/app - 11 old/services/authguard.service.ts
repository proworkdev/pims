import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate  {

    constructor(private router: Router) {}

    canActivate() {
        let token = localStorage.getItem('Username');
        if (token) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }

}