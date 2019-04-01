import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../../../user.service';
declare var $: any;
import { DialogService } from "ngx-bootstrap-modal";
import { Lightbox } from 'ngx-lightbox';
import { AlertsService } from '@jaspero/ng2-alerts';
import { NgxEditorModule } from 'ngx-editor';
import { NgxAutoScroll } from "ngx-auto-scroll";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {
  
  task:any;
  id = '';
  taskID:number;
  skuID:number;
  
  totalTickets:number;
  newTickets:number;
  openTickets:number;
  closedTickets:number;
  reviewRequired:number;
  fWRequired:number;
  complete:number;
  inProgressTickets:number;
  limit:number;
  start:number;



  /* form update vars*/
  title:string;
  sku:number;
  description:string;
  assigned_user:string;
  action:string;
  status:string;
  /* form update vars*/ 

  hide = true;
  ticket; //single ticket data

  pro_id:string;
  proTitle:string;
  pro_image1:string;
  pro_image2:string;
  pro_eBay_Category_Id:string;
  pro_qty:string;
  pro_Ref_Id:string;
  pro_Ref_Type:string;

  pro_image3:string;
  pro_image4:string;
  pro_image5:string;
  pro_image6:string;
  pro_image7:string;
  pro_image8:string;
  pro_image9:string;
  imgarray:any = [];
  index:number = 0; 
  pro_tag:string;

  pro_item_specific_1_name:string;
  pro_item_specific_2_name:string;
  pro_item_specific_3_name:string;
  pro_item_specific_4_name:string;
  pro_item_specific_5_name:string;
  pro_item_specific_6_name:string;
  pro_item_specific_7_name:string;
  pro_item_specific_8_name:string;
  pro_item_specific_9_name:string;

  pro_item_specific_1_value:string;
  pro_item_specific_2_value:string;
  pro_item_specific_3_value:string;
  pro_item_specific_4_value:string;
  pro_item_specific_5_value:string;
  pro_item_specific_6_value:string;
  pro_item_specific_7_value:string;
  pro_item_specific_8_value:string;
  pro_item_specific_9_value:string;
  
 
  pro_store_category_name:string;
  pro_gmo_brand:string;
  pro_gmo_mpn:string;
  pro_gmo_category:string;
  pro_description:string;

  stype = '';

  saveBtn:boolean = false;


  _album = []; /*lightbox var*/
  
  constructor(
    public userService:UserService,
    private router: Router,
    private dialogService:DialogService,
    private _lightbox: Lightbox,
    private _alert: AlertsService,
    private activatedRoute: ActivatedRoute,
  ) { }


  backdrop = 'true';
  opt: any = {
      title: '',
      content: '',
      icon: '', // success
      size: 'lg',
      showCloseButton: true,
      input: 'text',
      inputValue: '',
      inputPlaceholder: '必填项',
      inputRequired: true,
      inputError: '',
      inputAttributes: {},
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      showConfirmButton: true,
      confirmButtonText: 'Save',
      backdrop: true,
      timeout: 0,
      keyboard: true
  };
  private sub: any;
  readonlyAttr:boolean = false;


  confirmResult: boolean = null;
  promptMessage = '';

  ngOnInit() {
    this.taskInfo();


   

  }

  confirm_result = '';

  backdropChange() {
    switch (this.backdrop) {
        case 'true':
            this.opt.backdrop = true;
            break;
        case 'false':
            this.opt.backdrop = false;
            break;
        case 'static':
            this.opt.backdrop = 'static';
            break;
    }
}


  taskInfo() {
    this.userService.taskList().subscribe((data) => {

    this.task = data.data;
    console.log(this.task);
    this.sub = this.activatedRoute.params.subscribe(params => {
      if(params['id'] === undefined){
        this.taskID = data.data[0].TaskID;
        this.sku = data.data[0].SKU;
      }
      else{
        this.taskID = +params['id']; // (+) converts string 'id' to a number
        this.sku = +params['sku'];
      }
    });
    
        this.fetchTicket(this.taskID);
        this.fetchProductById(this.sku);
        this.totalTickets = data.count.total_count;
        this.newTickets = data.count.new_ticket;     
        this.reviewRequired = data.count.review_required;
        this.fWRequired = data.count.f_work_required;
        this.complete = data.count.complete;
        this.inProgressTickets = data.count.work_progress; 
      
      },
      err => {
        this.task = [];
        this.title = '';
        this.sku = 0;
        this.id = '';
        this.assigned_user = '';
        this.description = '';
        this.saveBtn = true; 
         let error;
         let message;
         error = JSON.parse(err._body);
         message = error.message;
         //alert(message);
        const type = 'error';
        this._alert.create(type, message);
      }

    );

  }

  fetchTicket(id){
    this.hide = true;
    this.userService.getTicketByID(id).subscribe((data) => {
      this.ticket = data.data;
      
      this.id = data.data[0].TaskID;
      // this.task = data.data;
      this.title = data.data[0].Title;
      this.sku = data.data[0].SKU;
      this.description = data.data[0].Description;
      this.assigned_user = data.data[0].Assigned_user;
      this.action = data.data[0].Action;
      this.status = data.data[0].Status;
      
    },
        err => {
          this.hide = true;
              let error;
              let message;
              error = JSON.parse(err._body);
              message = error.message;
              // alert(message);
              const type = 'error';
              this._alert.create(type, message);
            
            }
      
        );
  }

  showModal(id,sku)
  {
    this.fetchTicket(id);
    this.fetchProductById(sku);
    this.hide = true;
    this.opt.content = ``;

    document.getElementById("scroll").scrollIntoView();

  //   this.dialogService.confirm(this.opt.title || 'Update Ticket', this.opt.content || 'test', this.opt)
      
  //   .then((result: boolean) => {
  //     // result
  // });
    //this.dialogService.confirm('test', 'test');
    
  }
  

  updateTicket(id,title,assigned_user,action,status,description,sku){
    console.log(id,title,assigned_user,action,status);
  
    this.userService.updateTicketByID(id,title,assigned_user,action,status,description,sku).subscribe((data) => {
    // this.hide = false;
    let message = data.message;
    const type = 'success';
    this._alert.create(type, message); 
    this.taskInfo(); //fetch new ticket data
    document.getElementById("scroll").scrollIntoView();     
    },
        err => {
      
               let error;
               let message;
               error = JSON.parse(err._body);
               message = error.message;
               alert(message);
            
            }
      
        );
  }
  
  fetchProductById(sku){
    this.userService.getProductBySKU(sku).subscribe((data) => {
      //console.log(data);
        var result = data.data[0];
        this.pro_id = data.data[0].table_id;
        this.proTitle = data.data[0].Title;
        this.pro_image1 =data.data[0].Image1;
        this.pro_image2 = data.data[0].Image2;
        this.pro_image3 =data.data[0].Image3;
        this.pro_image4 = data.data[0].Image4;
        this.pro_image5 =data.data[0].Image5;
        this.pro_image6 = data.data[0].Image6;
        this.pro_image7 =data.data[0].Image7;
        this.pro_image8 = data.data[0].Image8;
        this.pro_image9 = data.data[0].Image9;
        this.pro_eBay_Category_Id = data.data[0].Ebay_category_id;
        this.pro_qty = data.data[0].Qty;
        this.pro_Ref_Id = data.data[0].Ref_Id;
        this.pro_Ref_Type = data.data[0].Ref_type;
        this.pro_gmo_brand = data.data[0].GMO_Brand;
        this.pro_gmo_mpn = data.data[0].GMO_MPN;
        this.pro_gmo_category = data.data[0].GMO_Category;
        this.pro_store_category_name = data.data[0].Store_category_name;
        this.pro_tag = data.data[0].Tag;

        this.pro_item_specific_1_name = data.data[0].Item_Specifics1_Name;
        this.pro_item_specific_2_name = data.data[0].Item_Specifics2_Name;
        this.pro_item_specific_3_name = data.data[0].Item_Specifics3_Name;
        this.pro_item_specific_4_name = data.data[0].Item_Specifics4_Name;
        this.pro_item_specific_5_name = data.data[0].Item_Specifics5_Name;
        this.pro_item_specific_6_name = data.data[0].Item_Specifics6_Name;
        this.pro_item_specific_7_name = data.data[0].Item_Specifics7_Name;
        this.pro_item_specific_8_name = data.data[0].Item_Specifics8_Name;
        this.pro_item_specific_9_name = data.data[0].Item_Specifics9_Name;

        this.pro_item_specific_1_value = data.data[0].Item_Specifics1_Value;
        this.pro_item_specific_2_value = data.data[0].Item_Specifics2_Value;
        this.pro_item_specific_3_value = data.data[0].Item_Specifics3_Value;
        this.pro_item_specific_4_value = data.data[0].Item_Specifics4_Value;
        this.pro_item_specific_5_value = data.data[0].Item_Specifics5_Value;
        this.pro_item_specific_6_value = data.data[0].Item_Specifics6_Value;
        this.pro_item_specific_7_value = data.data[0].Item_Specifics7_Value;
        this.pro_item_specific_8_value = data.data[0].Item_Specifics8_Value;
        this.pro_item_specific_9_value = data.data[0].Item_Specifics9_Value;


        this.pro_description = data.data[0].Description;

     
        this.imgarray = [
          {
            src: result.Image1,
            show: false
          },
          {
            src: result.Image2,
            show: false
          },
          {
            src: result.Image3,
            show: false
          },
          {
            src: result.Image4,
            show: false
          },
          {
            src: result.Image5,
            show: false
          },
          {
            src: result.Image6,
            show: false
          },
          {
            src: result.Image7,
            show: false
          },
        ]

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
  //pro_id,sku,proTitle,pro_image1,pro_image2,pro_image3,pro_image4,pro_image5,pro_image6,pro_image7,pro_eBay_Category_Id,pro_qty,pro_Ref_Id,pro_item_specific_1_name,pro_item_specific_2_name,pro_item_specific_3_name,pro_item_specific_4_name,pro_item_specific_5_name,pro_item_specific_6_name,pro_item_specific_7_name,pro_item_specific_8_name,pro_item_specific_9_name,pro_item_specific_1_value,pro_item_specific_2_value,pro_item_specific_3_value,pro_item_specific_4_value,pro_item_specific_5_value,pro_item_specific_6_value,pro_item_specific_7_value,pro_item_specific_8_value,pro_item_specific_9_value,pro_description,
  //id,sku,title,image1,image2,eBay_Category_Id,qty,ref_Id,ref_Type
  updateProductById(pro_id,sku,proTitle,pro_image1,pro_image2,pro_image3,pro_image4,pro_image5,pro_image6,pro_image7,pro_eBay_Category_Id,pro_Ref_Id,pro_item_specific_1_name,pro_item_specific_2_name,pro_item_specific_3_name,pro_item_specific_4_name,pro_item_specific_5_name,pro_item_specific_6_name,pro_item_specific_7_name,pro_item_specific_8_name,pro_item_specific_9_name,pro_store_category_name,pro_gmo_brand,pro_gmo_mpn,pro_gmo_category,pro_item_specific_1_value,pro_item_specific_2_value,pro_item_specific_3_value,pro_item_specific_4_value,pro_item_specific_5_value,pro_item_specific_6_value,pro_item_specific_7_value,pro_item_specific_8_value,pro_item_specific_9_value,pro_description){
    this.stype = 'bysku'; 
    this.updateTicket(this.id,this.title,this.assigned_user,this.action,this.status,this.description,sku);
    //pro_id,sku,proTitle,pro_image1,pro_image2,pro_eBay_Category_Id,pro_qty,pro_Ref_Id,pro_Ref_Type,'up'
    this.userService.updateProductSku(pro_id,sku,proTitle,pro_image1,pro_image2,pro_image3,pro_image4,pro_image5,pro_image6,pro_image7,pro_eBay_Category_Id,pro_Ref_Id,pro_item_specific_1_name,pro_item_specific_2_name,pro_item_specific_3_name,pro_item_specific_4_name,pro_item_specific_5_name,pro_item_specific_6_name,pro_item_specific_7_name,pro_item_specific_8_name,pro_item_specific_9_name,pro_store_category_name,pro_gmo_brand,pro_gmo_mpn,pro_gmo_category,pro_item_specific_1_value,pro_item_specific_2_value,pro_item_specific_3_value,pro_item_specific_4_value,pro_item_specific_5_value,pro_item_specific_6_value,pro_item_specific_7_value,pro_item_specific_8_value,pro_item_specific_9_value,pro_description,this.stype).subscribe((data) => {
        // this.hide = false;
        let message = data.message;
        const type = 'success';
        this._alert.create(type, message); 
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


  open(index): void {
    
    if(this._album.length>0){
       this._album.length = 0;     
    }
    const album = {
      src: index
   };
   this._album.push(album);
   this._lightbox.open(this._album);
  }


  close(): void {     
    this._lightbox.close();
  }

  
  delete(id){
    this.opt.confirmButtonText = 'Delete';
    this.opt.confirmButtonClass = 'btn-danger';
    this.dialogService.confirm(this.opt.title || 'Delete Ticket', this.opt.content || 'Are you sure to delete this ticket', this.opt)
      
      .then((result: boolean) => {
        this.confirm_result = result ? 'true' : 'false';
        if(result){
          // this.dialogService.confirm('test', 'test');  
          this.userService.deleteTicket(id).subscribe((data) => {
              let message = data.message;
              const type = 'success';
              this._alert.create(type, message);  
              this.taskInfo();
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
        console.log(this.confirm_result);
        // result
    });
   
  }


  editImgTitle(imgarray: { src: string, show: boolean }){
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


  clearTicket(){
    console.log(this.id);

    this.saveBtn = true;
    this.id = '';
    this.sku = 2;
    this.title= '';
    this.action = 'New Ticket';
    this.assigned_user = '';
    this.description = '';
    this.proTitle = '';
    this.pro_image1 = '';
    this.pro_image2 = '';  
    this.pro_image3 = '';
    this.pro_image4 = '';
    this.pro_image5 = '';
    this.pro_image6 = '';
    this.pro_image7 = '';
    this.pro_image2 = ''
    this.pro_eBay_Category_Id = '';
    this.pro_Ref_Id = '';
    this.pro_tag= '';
    this.pro_store_category_name = '';
    this.pro_gmo_brand = '';
    this.pro_gmo_mpn = '';
    this.pro_gmo_category = '';
    // for(var i=1;i<=7;i++){
    //   this.pro_item_specific_+i+_name = '';
    // }

    this.pro_item_specific_1_name = '';
    this.pro_item_specific_2_name = '';
    this.pro_item_specific_3_name = '';
    this.pro_item_specific_4_name = '';
    this.pro_item_specific_5_name = '';
    this.pro_item_specific_6_name = '';
    this.pro_item_specific_7_name = '';
    this.pro_item_specific_8_name = '';
    this.pro_item_specific_9_name = '';

    this.pro_item_specific_1_value = '';
    this.pro_item_specific_2_value = '';
    this.pro_item_specific_3_value = '';
    this.pro_item_specific_4_value = '';
    this.pro_item_specific_5_value = '';
    this.pro_item_specific_6_value = '';
    this.pro_item_specific_7_value = '';
    this.pro_item_specific_8_value = '';
    this.pro_item_specific_9_value = '';
    this.pro_description = '';
    this.imgarray = []
    // this. = '';
    // this. = '';
    // this. = '';
    // this. = '';

    //this.sku = '';
    //document.getElementsByName('id').removeAttr("readonly");
    //document.getElementById("editProductForm").reset();
  }

  addTicket(title,assigned_user,action,description,sku){
    console.log(title,assigned_user,action,description,sku);
    this.saveBtn = false;
    // this.id = '';
    // //this.sku = 0;
    // this.title= '';
    // this.action = 'New Ticket';
    // this.assigned_user = '';
    // this.description = '';
    this.userService.addTicket(title,assigned_user,action,description,sku).subscribe((data) => {
       let result = data.data;
       let sku = data.sku;
       let message = data.message;
       const type = 'success';
       this._alert.create(type, message);
       this.taskInfo();
       this.showModal(result,sku);
       },
       err => {       
         let error;
         let message;        
       }
     
    );
 
  }
}
