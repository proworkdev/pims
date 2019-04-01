import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from  '../../../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.scss']
})
export class EditSaleComponent implements OnInit {

  id: number;
  private sub: any;

  /*form params*/
  itemNumber:string;
  type:string;
  sku:string;
  title:string;
  sold:string;
  watchers:string;
  viewers:string;
  tag:string;
  image1:string;
  /*form params*/

  constructor(
    private router: Router, private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      
    });

    /*get sale history data by id*/
    this.userService.getSaleHistoryByID(this.id).subscribe((data) => {     
        let result = data.data[0];
        this.itemNumber = result.Item_number;
        this.type = result.Type;
        this.sku = result.SKU;
        this.title = result.Title;
        this.sold = result.Sold;
        this.watchers = result.Watcher;
        this.viewers = result.Viewer
        this.tag = result.Tag;
        this.image1 = result.Image1;  
      },
      err => {       
        let error;
        let message;
        error = JSON.parse(err._body);
        message = error.message;
        const type = 'error';
        // this._alert.create(type, message);
        alert(message);
      }

    ); 
    /*get sale history data by id*/
  }


  updateSale(id,itemNumber,type,image1,sku,title,sold,watchers,viewers,tag){
    this.userService.updateSale(id,itemNumber,type,image1,sku,title,sold,watchers,viewers,tag).subscribe((data) => {
      
      this.router.navigate(['theme/soldproduct']);
      },
      err => {       
        let error;
        let message;
       
      }
    
   );
  }

}
