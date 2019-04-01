import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from  '../../../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertsService } from '@jaspero/ng2-alerts';
import { NgxEditorModule } from 'ngx-editor';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  htmlContent= "test";
  sku:number;
  title = '';
  image1:string = '';
  image2:string = '';
  image3:string = '';
  image4:string = '';
  image5:string = '';
  image6:string = '';
  image7:string = '';
  eBay_Category_Id ='';
  tag:string = '';
  qty= '';
  ref_Id = '';
  ref_Type='';
  store_category_name:string;
  gmo_brand:string;
  gmo_mpn:string;
  gmo_category:string;
  item_specific_1_name:string;
  item_specific_2_name:string;
  item_specific_3_name:string;
  item_specific_4_name:string;
  item_specific_5_name:string;
  item_specific_6_name:string;
  item_specific_7_name:string;
  item_specific_8_name:string;
  item_specific_9_name:string;
  item_specific_1_value:string;
  item_specific_2_value:string;
  item_specific_3_value:string;
  item_specific_4_value:string;
  item_specific_5_value:string;
  item_specific_6_value:string;
  item_specific_7_value:string;
  item_specific_8_value:string;
  item_specific_9_value:string;
  description:string;
  id:number;
  hide:boolean;
  imgarray:any = [];
  index:number= 0;

  private sub: any;

  constructor(
    private router: Router, private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private _alert: AlertsService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.hide = false;
    });
    //console.log(this.id);
    this.getProductById(this.id)
    
  };

  public getProductById(id){
    this.userService.getProductByID(id).subscribe((data) => {
      
        var result = data.data[0];
        this.id = result.table_id;
        this.sku = result.SKU;
        this.title = result.Title;
        this.image1 = result.Image1;
        this.image2 = result.Image2;
        this.image3 = result.Image3;
        this.image4 = result.Image4;
        this.image5 = result.Image5;
        this.image6 = result.Image6;
        this.image7 = result.Image7;
        this.tag = result.Tag;
        this.eBay_Category_Id = result.Ebay_category_id;
        this.qty=  result.Qty;
        this.ref_Id =  result.Ref_Id;
        this.ref_Type= result.Ref_type; 
        this.store_category_name = result.Store_category_name; 
        this.gmo_brand = result.GMO_Brand;
        this.gmo_mpn = result.GMO_MPN;
        this.gmo_category = result.GMO_Category;
        this.item_specific_1_name = result.Item_Specifics1_Name;
        this.item_specific_2_name = result.Item_Specifics2_Name;
        this.item_specific_3_name = result.Item_Specifics3_Name;
        this.item_specific_4_name = result.Item_Specifics4_Name;
        this.item_specific_5_name = result.Item_Specifics5_Name;
        this.item_specific_6_name = result.Item_Specifics6_Name;
        this.item_specific_7_name = result.Item_Specifics7_Name;
        this.item_specific_8_name = result.Item_Specifics8_Name;
        this.item_specific_9_name = result.Item_Specifics9_Name;
        
        this.item_specific_1_value = result.Item_Specifics1_Value;
        this.item_specific_2_value = result.Item_Specifics2_Value;
        this.item_specific_3_value = result.Item_Specifics3_Value;
        this.item_specific_4_value = result.Item_Specifics4_Value;
        this.item_specific_5_value = result.Item_Specifics5_Value;
        this.item_specific_6_value = result.Item_Specifics6_Value;
        this.item_specific_7_value = result.Item_Specifics7_Value;
        this.item_specific_8_value = result.Item_Specifics8_Value;
        this.item_specific_9_value = result.Item_Specifics9_Value;

        this.description = result.Description;
      
        console.log(this.item_specific_1_value);
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
        // this._alert.create(type, message);
        alert(message);
      }

    ); 
  }

  public updateProduct(id,sku,title,image1,image2,image3,image4,image5,image6,image7,eBay_Category_Id,ref_Id,item_specific_1_name,item_specific_2_name,item_specific_3_name,item_specific_4_name,item_specific_5_name,item_specific_6_name,item_specific_7_name,item_specific_8_name,item_specific_9_name,store_category_name,gmo_brand,gmo_mpn,gmo_category,item_specific_1_value,item_specific_2_value,item_specific_3_value,item_specific_4_value,item_specific_5_value,item_specific_6_value,item_specific_7_value,item_specific_8_value,item_specific_9_value,description
  ){
    let stype= '';
      //  console.log(id); 
       this.userService.updateProductSku(id,sku,title,image1,image2,image3,image4,image5,image6,image7,eBay_Category_Id,ref_Id,item_specific_1_name,item_specific_2_name,item_specific_3_name,item_specific_4_name,item_specific_5_name,item_specific_6_name,item_specific_7_name,item_specific_8_name,item_specific_9_name,store_category_name,gmo_brand,gmo_mpn,gmo_category,item_specific_1_value,item_specific_2_value,item_specific_3_value,item_specific_4_value,item_specific_5_value,item_specific_6_value,item_specific_7_value,item_specific_8_value,item_specific_9_value,description
       ).subscribe((data) => {
        let message = data.message;
        const type = 'success';
        this._alert.create(type, message); 
        this.getProductById(id);
          //this.router.navigate(['theme/product']);
          },
          err => {       
            let error;
            let message;
           
          }
        
        );
    
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
  