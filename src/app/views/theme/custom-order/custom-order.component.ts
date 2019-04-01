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
   view_svg_image :boolean = true;
   view_jpg_image :boolean = true;
   private sub: any;
   id:number;
   particularOrder:any;
   packaging_used:string;
   instructions:string;
   design_window_check:boolean;
   design_window_color:string;
   design_window_size:string;
   ebay_msg_history:string;
   ebay_user_id:string;
   estimated_ebay:string;
   gross_profit:string;
   material_height:string;
   material_price:string;
   material_width:string;
   postage_cost:string;
   selling_price:string;  
   ticket_stage:string = 'New Job';
   svgmod:string="svg_file";
   jpvmod:string="jpg_file";
   imgarray:any = [];
   index:number = 0;
   user_id:string= '';
   svg_file:string = 'https://www.tritecgraphics.co.uk/vector.jpg';
   jpg_file:string = 'https://www.tritecgraphics.co.uk/customer_preview.jpg';
   
   saveBtn:boolean = true; //

   totalTask:number;
   newTask:number;
   completeTask:number;


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
        custom_no: {
          title: 'Custom Job ID',
          // valuePrepareFunction:(cell,row)=>{
            
          //     count = count+1;
          //     //console.log(count);
          //     return count;
          //   },
           // filter: false
        },
        user_id: {
          title: 'Ebay User ID',
          type:'html',
          valuePrepareFunction:(cell,row)=>{
            return `<a href="#/theme/customorder/${(row.id)}" >`+ row.ebay_user_id + `</a>`;
           }
          //(click)="showModal(val.TaskID,val.SKU)" 
        },
        ticket_stage: {
          //title: 'Ticket Stage',
          title: 'Job Status',
          //type:'html',
         // valuePrepareFunction:(cell,row)=>{
            //return `<a href="#/theme/edit-product/${(row.table_id)}" >`+ row.Title + `</a>`
          //},
        },

        Date_added: {
          //title: 'Ticket Stage',
          title: 'Date Created',
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
          // valuePrepareFunction:(cell,row)=>{
          //   return `<a href="#/theme/customorder/${(row.id)}" >`+ row.ebay_user_id + `</a>`;
          //  }
          custom: [
           { name: 'Delete', title: `<a href="#/theme/customorder" class="btn btn-danger"><span class="fa fa-trash text-white"></span></button>` }
         ],
          
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
        perPage:100
      }
    };

    this.hide = true;
    this.view_svg_image = false;
    this.view_jpg_image = false;
    
    this.sub = this.activatedRoute.params.subscribe(params => {
      if(+params['id']) // (+) converts string 'id' to a number
      {
        this.id = +params['id'];
        this.getOrderById(this.id,'down');
      }
      
    });
  }


  customOrderInfo(){
    this.userService.customOrderList().subscribe((data) => {
    
    this.order = data.data;
    this.totalTask = data.count.total_count;
    this.newTask = data.count.new_job;
    this.completeTask = data.count.complete;
    console.log(this.totalTask);
    if(this.id === undefined){
      this.id = this.order[0].id;
      this.getOrderById(this.id,'up');
      
      //document.getElementById("scrollup").scrollIntoView();      
    }
    // console.log(this.order);
    let count:number = 1;
    var result =  this.order.map(function(el) {
    var o = Object.assign({}, el);
      o.custom_no = count++;
      return o;
    })
   this.order = '';
   //console.log(this.order);
   this.order = result;
   this.saveBtn = true;
        // let message = data.message;
        // const type = 'success';
        // this._alert.create(type, message);
        
      },
      err => {   
        this.saveBtn = false;    
        let error;
        let message;
        error = JSON.parse(err._body);
        message = error.message;
        const type = 'error';
        this._alert.create(type, message);
      }
    
    );
     
  }

  getOrderById(id,start){
    
    this.hide = true;
    this.userService.getOrderById(id).subscribe((data) => {
      this.particularOrder = data.data[0];
      this.id = this.particularOrder.id;
      // console.log(this.particularOrder);
      this.svg_file = this.particularOrder.svg_file;
      this.packaging_used = this.particularOrder.packaging_used;
      // this.ebay_message_history = this.particularOrder.ebay_message_history; 
      this.jpg_file = this.particularOrder.jpg_file;
      this.instructions = this.particularOrder.instructions;
     // this.design_window_check = this.particularOrder.design_window_check;
      if(this.particularOrder.design_window_check==0){
        console.log(this.design_window_check);
        this.design_window_check = false;
      }
      else
        {
          this.design_window_check = true;
        }
      console.log(this.design_window_check);
      this.design_window_color = this.particularOrder.design_window_color;
      this.design_window_size = this.particularOrder.design_window_size;
      this.ebay_msg_history = this.particularOrder.ebay_msg_history;
      this.ebay_user_id = this.particularOrder.ebay_user_id;
      this.estimated_ebay = this.particularOrder.estimated_ebay;
      this.gross_profit = this.particularOrder.gross_profit;
      //console.log(this.gross_profit);
      this.material_height = this.particularOrder.material_height;
      this.material_price = this.particularOrder.material_price;
      this.material_width = this.particularOrder.material_width;
      this.postage_cost = this.particularOrder.postage_cost;
      this.selling_price = this.particularOrder.selling_price;  
      this.ticket_stage = this.particularOrder.ticket_stage;
      const title1 = "SVG Cut File";
      const title2 = "JPG Cut File";
      const modalTitle1 = "svg_file";
      const modelTitle2 = "jpg_file";

        // let message = data.message;
        // const type = 'success';
        // this._alert.create(type, message); 
        this.imgarray = [
          {
            src: this.particularOrder.svg_file,
            show: false,
            model:modalTitle1,
            title: title1
          },
          {
            src: this.particularOrder.jpg_file,
            show: false,
            model: modelTitle2,
            title: title2
          }
        ];

        if(start=="down"){
          document.getElementById("scrolldown").scrollIntoView();
        }
        else{
          document.getElementById("scrollup").scrollIntoView();
        }
        // document.getElementById("scrolldown").scrollIntoView();
        this.saveBtn = true;
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


   showLabelsvg(){
    //this.view_image = true;
    if(this.view_svg_image==true){
      this.view_svg_image = false;
    }
    else
      {
        this.view_svg_image = true;
      }
  }

   showLabeljpg(){
    //this.view_image = true;
    if(this.view_jpg_image==true){
      this.view_jpg_image = false;
    }
    else
      {
        this.view_jpg_image = true;
      }
  }
  

  editImgTitle(imgarray: { src: string, show: boolean }){
   // this.view_image = true;
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

  updateorder(id,svg_file,jpg_file,packaging_used,instructions,design_window_check,design_window_color,design_window_size,ebay_msg_history,ebay_user_id,estimated_ebay,gross_profit,material_height,material_price,material_width,postage_cost,selling_price,ticket_stage){
    this.userService.updateorderById(id,svg_file,jpg_file,packaging_used,instructions,design_window_check,design_window_color,design_window_size,ebay_msg_history,ebay_user_id,estimated_ebay,gross_profit,material_height,material_price,material_width,postage_cost,selling_price,ticket_stage
      ).subscribe((data) => {
       let message = data.message;
       const type = 'success';
       this._alert.create(type, message); 
       this.getOrderById(this.id,'up');
       this.order = [];
       this.customOrderInfo();
         //this.router.navigate(['theme/product']);
         },
         err => {       
           let error;
           let message;
          
         }
       
       );
  }
  
  clearOrer(){
    this.id = null;
    this.svg_file = 'https://www.tritecgraphics.co.uk/vector.jpg';
    this.jpg_file = 'https://www.tritecgraphics.co.uk/customer_preview.jpg';
    this.ticket_stage = 'New Job';
    this.instructions = '';
    this.design_window_check = false;
    this.design_window_color = '';
    this.design_window_size = '';
    this.ebay_user_id  = '';
    this.selling_price = '';
    this.material_price = '';
    this.packaging_used = '';
    this.material_height = '';
    this.material_width = '';
    this.postage_cost = '';
    this.estimated_ebay = '';
    this.gross_profit = '';
    this.ebay_msg_history = '';

    this.saveBtn = false; // show save button
    document.getElementById("scrolldown").scrollIntoView();
  }

  //console.log(user_id,ticket_stage,svg_image,jpg_image,special_instruction,design_window_check,color,size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_cost,estimated_ebay,gross_profit,ebay_message_history);
  public addOrder(ticket_stage,svg_file,jpg_file,instructions,design_window_check,design_window_color,design_window_size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_cost,estimated_ebay,gross_profit,ebay_msg_history){
    console.log(ticket_stage,svg_file,jpg_file,instructions,design_window_check,design_window_color,design_window_size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_cost,estimated_ebay,gross_profit,ebay_msg_history);
    this.userService.addOrder(ticket_stage,svg_file,jpg_file,instructions,design_window_check,design_window_color,design_window_size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_cost,estimated_ebay,gross_profit,ebay_msg_history).subscribe((data) => {
    //  this.router.navigate(['theme/customorder']);
    let message = data.message;
    const type = 'success';
    this._alert.create(type, message);    
    this.customOrderInfo();
    this.id = data.data;
    this.getOrderById(data.data,'up');
    //document.getElementById("scrollup").scrollIntoView();
        
    },
    err => {       
      let error;
      let message;        
    }
  
    );
  
   }
}
