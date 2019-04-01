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


  action:string = "New Ticket";

  ngOnInit() {
  }

  public addTicket(title,assigned_user,action,description,sku){
    this.userService.addTicket(title,assigned_user,action,description,sku).subscribe((data) => {
       let result = data.data;
       let sku = data.sku;
       
       this.router.navigate(['theme/taskmanager/'+result+"/"+sku]);
       },
       err => {       
         let error;
         let message;        
       }
     
    );
 
  }
}
