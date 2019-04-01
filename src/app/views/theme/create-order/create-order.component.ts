import { Component, OnInit } from '@angular/core';
import { NgModule } from "@angular/core";
import {Router} from "@angular/router";
import { UserService } from  '../../../user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '@jaspero/ng2-alerts';

import { NgxEditorModule } from 'ngx-editor';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  constructor(  private router: Router, 
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  ticket_stage:string = "New Job"; 
  svg_image:string = "https://www.tritecgraphics.co.uk/vector.jpg";
  jpg_image:string = "https://www.tritecgraphics.co.uk/customer_preview.jpg";


  //addOrder(user_id,ticket_stage,svg_image,jpg_image,special_instruction,design_window_check,color,size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_code,estimated_ebay,gross_profit,ebay_message_history)

  public addOrder(ticket_stage,svg_image,jpg_image,special_instruction,design_window_check,color,size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_cost,estimated_ebay,gross_profit,ebay_message_history){
   console.log(ticket_stage,svg_image,jpg_image,special_instruction,design_window_check,color,size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_cost,estimated_ebay,gross_profit,ebay_message_history);
    this.userService.addOrder(ticket_stage,svg_image,jpg_image,special_instruction,design_window_check,color,size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_cost,estimated_ebay,gross_profit,ebay_message_history).subscribe((data) => {
       
      //  this.router.navigate(['theme/customorder']);
       },
       err => {       
         let error;
         let message;        
       }
     
    );
 
  }
}
