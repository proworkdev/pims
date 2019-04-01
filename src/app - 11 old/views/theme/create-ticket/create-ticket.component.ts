import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from  '../../../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  constructor(
    private router: Router, 
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  public addTicket(title,assigned_user,action,status,description,sku,type){
    this.userService.addTicket(title,assigned_user,action,status,description,sku,type).subscribe((data) => {
       
       this.router.navigate(['theme/taskmanager']);
       },
       err => {       
         let error;
         let message;        
       }
     
    );
 
  }
}
