// import { Component } from '@angular/core';
import { Component,OnInit} from '@angular/core';
import { UserService } from  '../../user.service';
//import { Observable } from 'rxjs/Observable';
import { AlertsService } from '@jaspero/ng2-alerts';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  constructor( private router: Router, public userService: UserService,private _alert: AlertsService) { }


  Signup(username,email, password,contact) {
     console.log(username,email, password,contact);
   
    this.userService.signup(username,email, password,contact).subscribe((data) => {
        let loginUser;
        let loginEmail
        loginUser =  data.data.Name;
        loginEmail =  data.data.email;
        localStorage.setItem('Username', data.data.Name);
        this.router.navigate(['/login']);
       // console.log("result ",data);
      },
      err => {
        let error;
        let message;
        error = JSON.parse(err._body);
        message = error.message;
        const type = 'error';
        this._alert.create(type, message);
      }
   );

  }

}
