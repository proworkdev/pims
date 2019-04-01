import { Component, OnInit } from '@angular/core';
import { NgModule } from "@angular/core";
import {Router} from "@angular/router";
import { UserService } from  '../../../user.service';
import { Lightbox } from 'ngx-lightbox';
import { AlertsService } from '@jaspero/ng2-alerts';
import { DataTableModule } from "angular-6-datatable";


import { HttpClient } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
// import { Table } from './../table/table.component';

import { ServerDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 
  source: ServerDataSource;
  product:any;
  id = '';  
  imgpreview = ''; 
  _album = [];
  
  /*pagination*/
  start:number=0;
  limit:number=10;
  /*pagination*/
  pagination:number;
  index:number = 0;
  page:number=0;

 // mfData: any[];
  mfRowsOnPage: number= 5;
  mfActivePage: number = 1;
  mfSortBy: any;
  mfSortOrder: string;
  rowsOnPageSet = 5;
  public data : any;
  //settings:any;
  stype = 'sold';

  

  settings = {
    columns: {
      custom_no : {
        title: 'Product ID',
        // valuePrepareFunction:(cell,row)=>{
          
        //     count = count+1;
        //     //console.log(count);
        //     return count;
        //   },
          filter: false
      },
      SKU: {
        title: 'SKU'
      },
      Title: {
        title: 'Title',
        type:'html',
        valuePrepareFunction:(cell,row)=>{
          return `<a href="#/theme/edit-product/${(row.table_id)}" >`+ row.Title + `</a>`
        },
      },
      Store_category_name: {
        title: 'Store Category Name'
      },
      Tag: {
        title: 'Tag'
      },
      Bin_price: {
        title: 'Bin price'
      }        
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
        //   return `<a (click)="editProduct(val.table_id)">`+ row.Title + `</a>`
        // },
        
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
      perPage:10,
      //shouldshow():this.source.count() > this.perPage;
    
      // valuePrepareFunction:(cell,row)=>{
      //   return "a";
      // },
    }
  };
  res : any;
  constructor(
    public userService:UserService,
    private router: Router,
    private _lightbox: Lightbox,
    private _alert: AlertsService,
    private http: HttpClient
    
  ) {
    this.source = new ServerDataSource(http, { 
      //endPoint: 'http://localhost/digi_service/public/index.php?type=getProduct',
      endPoint: 'http://167.99.236.134/digi_service/public/index.php?type=getProduct',
      pagerLimitKey:"_limit",
      pagerPageKey:"_page",
      sortDirKey: "_order",
      sortFieldKey: "_sort",
      dataKey:'data',
      totalKey:'total'

    });
    
    //this.source.setPaging(1,10);
   // this.res  =  JSON.parse(this.source);
    console.log(this.source);
  }

  ngOnInit() {
    //this.productInfo(this.start,this.limit, this.page);
    let count:number = 0;
    
    //this.source.setPaging({ perPage: 15 });
    //   this.data = [{'name':'Ani', 'email' :'a.singh581@gmail.com', 'age' :'1', 'city':'Noida, UP, India' },
    //   {'name':'Anil', 'email' :'b.singh581@gmail.com', 'age' :'2', 'city':'Noida' },
    //   {'name':'Sunil', 'email' :'c.singh581@gmail.com', 'age' :'3', 'city':'Noida' },
    //   {'name':'Alok', 'email' :'d.singh581@gmail.com', 'age' :'4', 'city':'Noida' },
    //   {'name':'Tinku', 'email' :'e.singh581@gmail.com', 'age' :'5', 'city':'Noida' },
    //   {'name':'XYZ', 'email' :'f.singh581@gmail.com', 'age' :'6', 'city':'Noida' },
    //   {'name':'asas', 'email' :'f.singh581@gmail.com', 'age' :'7', 'city':'Noida' },
    //   {'name':'erer', 'email' :'h.singh581@gmail.com', 'age' :'8', 'city':'Noida' },
    //   {'name':'jhjh', 'email' :'i.singh581@gmail.com', 'age' :'9', 'city':'Noida' }
    //  ]
   
   //console.log(this.data);
    // this.settings.pager.perPage = 100;
 
  }

  count:number;

  productInfo(start=0,limit=10,page){
    console.log(start,limit,page+1);
    if(page>1){
      this.start = this.start+10;
    }
    // console.log(start,limit);
    this.userService.productList(start,limit,page).subscribe((data) => {
    this.product = data.data;
   
    this.data  = data.data;
    this.count = data.total_pages;
    this.pagination = data.data;

    let count:number = 1;
    var result =  this.product.map(function(el) {
      var o = Object.assign({}, el);
      o.custom_no = count++;
      return o;
    })
    
    this.product = '';
    this.product = result;
    console.log(this.product);
   
   
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

  counter(i: number) {
    return new Array(i);
  }

  editProduct(id) {
    console.log(this.id);

    this.router.navigate(['theme/edit-product/', id]);
    
    // this.userService.getProductByID(id).subscribe((data) => {      
    //     this.product = data.data;        
    //   },
    //   err => {  
    //   }
    // );

  };
   

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
  
  public productCsv(){
    this.stype = 'product';
    this.downloadCsv(this.stype);
  }

  public downloadCsv(stype){
    this.userService.exportCsv(this.stype,'all').subscribe((data) => {

    this.generateCSV(data.data,new Date().getTime());
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

  public generateCSV(csv, filename) {
    // console.log(csv);
    var csvFile;
    var downloadLink;
    csvFile = new Blob([csv], {
        type: "text/csv;charset=utf-8",
    });
    downloadLink = document.createElement("a");
    downloadLink.download = filename+".csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

}
