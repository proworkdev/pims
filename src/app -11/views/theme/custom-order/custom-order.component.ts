import { Component, OnInit,Input } from '@angular/core';

import { NgModule } from "@angular/core";
import {Router} from "@angular/router";
import { UserService } from  '../../../user.service';
import { AlertsService } from '@jaspero/ng2-alerts';
import { DataTableModule } from "angular-6-datatable";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-custom-order',
  templateUrl: './custom-order.component.html',
  styleUrls: ['./custom-order.component.scss']
})
export class CustomOrderComponent implements OnInit {

   settings:any;
   order:any;
   hide :boolean = true;
   private sub: any;
   id:number;
   particularOrder:any;
   packaging_used:string;
   svg_file:string;
   jpg_file:string;
   instructions:string;
   design_window_check:boolean;
   design_window_color:string;
   design_window_size:string;
   ebay_msg_history:string;
   ebay_user_id:number;
   estimated_ebay:string;
   gross_profit:number;
   material_height:string;
   material_price:string;
   material_width:string;
   postage_cost:string;
   selling_price:string;  
   ticket_stage:string;

   imgarray:any = [];

   @Input() height: string;
  

  constructor(
    public userService:UserService,
    private router: Router,
    private _alert: AlertsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.customOrderInfo();
    let count:number = 0;
    this.settings = {
      columns: {
        '#': {
          title: '#',
          valuePrepareFunction:(cell,row)=>{
            
              count = count+1;
              //console.log(count);
              return count;
            },
            filter: false
        },
        user_id: {
          title: 'User id',
          type:'html',
          valuePrepareFunction:(cell,row)=>{
            return `<a href="/#/theme/customorder/${(row.id)}" >`+ row.user_id + `</a>`;
           }
          //(click)="showModal(val.TaskID,val.SKU)" 
        },
        ticket_stage: {
          title: 'Ticket Stage',
          //type:'html',
         // valuePrepareFunction:(cell,row)=>{
            //return `<a href="#/theme/edit-product/${(row.table_id)}" >`+ row.Title + `</a>`
          //},
        },
        // Store_category_name: {
        //   title: 'Store Category Name'
        // },
        // Tag: {
        //   title: 'Tag'
        // },particularOrder
        // Bin_price: {
        //   title: 'Bin price'
        // }        
      },
      mode: 'external',
      actions: {
          delete: false,
          add: false,
          edit: false,
          position: 'right',
          title: 'Title',
          type:'html',
          valuePrepareFunction:(cell,row)=>{
             //return `<a  href="editProduct(val.table_id)">`+ row.Title + `</a>`
           },
          
      },
      rowClassFunction: (row) => {
        //console.log(row);
        // var curUserId = localStorage.getItem('user_id');
        if(row.data.Title){
          // return "hey";
         
        }
            // return 'hide-action';
        
      },
      pager : {
        display : true,
        perPage:10
      }
    };

    this.hide = false;

    this.sub = this.activatedRoute.params.subscribe(params => {
      if(+params['id']) // (+) converts string 'id' to a number
      {
        this.id = +params['id'];
        this.getOrderById(this.id);
        
      }
      
    });
  }


  customOrderInfo(){
    this.userService.customOrderList().subscribe((data) => {
          
    this.order = data.data;
    //console.log(this.product);
   
   
        // let message = data.message;
        // const type = 'success';
        // this._alert.create(type, message);
        
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

  public getOrderById(id){
    this.hide = true;
    this.userService.getOrderById(id).subscribe((data) => {
      this.particularOrder = data.data[0];
      console.log(this.particularOrder);
      this.svg_file = this.particularOrder.svg_file;
      this.packaging_used = this.particularOrder.packaging_used;
      this.jpg_file = this.particularOrder.svg_file;
      // this.ebay_message_history = this.particularOrder.ebay_message_history; 

      
      this.packaging_used = this.particularOrder.packaging_used;
      
      this.jpg_file = this.particularOrder.jpg_file;
      this.instructions = this.particularOrder.instructions;
      this.design_window_check = this.particularOrder.design_window_check;
      this.design_window_color = this.particularOrder.design_window_color;
      this.design_window_size = this.particularOrder.design_window_size;
      this.ebay_msg_history = this.particularOrder.ebay_msg_history;
      this.ebay_user_id = this.particularOrder.ebay_user_id;
      this.estimated_ebay = this.particularOrder.estimated_ebay;
      this.gross_profit = this.particularOrder.gross_profit;
      this.material_height = this.particularOrder.material_height;
      this.material_price = this.particularOrder.material_price;
      this.material_width = this.particularOrder.material_width;
      this.postage_cost = this.particularOrder.postage_cost;
      this.selling_price = this.particularOrder.selling_price;  
      this.ticket_stage = this.particularOrder.ticket_stage;
        // let message = data.message;
        // const type = 'success';
        // this._alert.create(type, message); 
        this.imgarray = [
          {
            src: this.particularOrder.svg_file,
            show: false
          },
          {
            src: this.particularOrder.jpg_file,
            show: false
          }
        ]
      },
      err => {       
        let error;
        let message;
        error = JSON.parse(err._body);
        message = error.message;
        const type = 'error';
        alert(message);
      }
     
    );
  }

  customordersingle(id){
    console.log(id);
  }


  public editImgTitle(imgarray: { src: string, show: boolean }){
    console.log(imgarray,name);
    //this.show = true;
   this.hide = true;
    this.imgarray.map((l) => {
      if (l.src === imgarray.src) {
        l.show = !l.show;
      } else {
        l.show = false;
      }
    })
  }

  
}
