import { Component,OnInit} from '@angular/core';
import { UserService } from  '../../user.service';
//import { Observable } from 'rxjs/Observable';
import { AlertsService } from '@jaspero/ng2-alerts';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent  {

  //loginForm: NgForm;

  
  /*constructor(public userService: UserService, 
  /*  private http: Http,
    private route: Router
  ) { }*/

  constructor(
    private router: Router,
    public userService: UserService,
    private _alert: AlertsService
    ) { }

  Login(email, password) {
    
    this.userService.login(email, password).subscribe((data) => {
      if(data.data)
        {
          let loginUser;
          let loginEmail
          loginUser =  data.data.Name;
          loginEmail =  data.data.email;
          localStorage.setItem('Username', data.data.Name);
          this.router.navigate(['/']);
        }
        //console.log("result ",data.data.Name);
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
