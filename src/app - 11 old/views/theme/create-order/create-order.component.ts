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


  //addOrder(user_id,ticket_stage,svg_image,jpg_image,special_instruction,design_window_check,color,size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_code,estimated_ebay,gross_profit,ebay_message_history)

  public addOrder(user_id,ticket_stage,svg_image,jpg_image,special_instruction,design_window_check,color,size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_cost,estimated_ebay,gross_profit,ebay_message_history){
   // console.log(user_id,ticket_stage,svg_image,jpg_image,special_instruction,design_window_check,color,size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_code,estimated_ebay,gross_profit,ebay_message_history);
    this.userService.addOrder(user_id,ticket_stage,svg_image,jpg_image,special_instruction,design_window_check,color,size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_cost,estimated_ebay,gross_profit,ebay_message_history).subscribe((data) => {
       
       this.router.navigate(['theme/customorder']);
       },
       err => {       
         let error;
         let message;        
       }
     
    );
 
  }
}
