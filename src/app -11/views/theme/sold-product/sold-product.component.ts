import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from  '../../../user.service';
import { Lightbox } from 'ngx-lightbox';
import { AlertsService } from '@jaspero/ng2-alerts';

@Component({
  selector: 'app-sold-product',
  templateUrl: './sold-product.component.html',
  styleUrls: ['./sold-product.component.scss']
})
export class SoldProductComponent implements OnInit {
  soldProduct = '';
  id = '';
  _album = [];

  constructor(
    public userService:UserService,
    private router: Router,
    private _lightbox: Lightbox,
    private _alert: AlertsService
  ) { }


  ngOnInit() {
    this.soldProductInfo();
  }


  soldProductInfo(){
    this.userService.soldProductList().subscribe((data) => {
          
    this.soldProduct = data.data;
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


  editProduct(id) {
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
    
    // close lightbox programmatically
    this._lightbox.close();
  }
  

  /*navigating to edit-sale view*/
  editSale(id) {
    this.router.navigate(['theme/edit-sale/', id]);
  };
  /*navigating to edit-sale view*/

}
