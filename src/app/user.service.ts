import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: Http) { }
  baseUrl: string = 'http://localhost/digi_service/public/index.php';
  //baseUrl: string = 'http://167.99.236.134/digi_service/public/index.php';

  login(email, password) {

    var payload = new FormData();

    payload.append("type", 'login');
    payload.append('email', email);
    payload.append('password', password);
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }

  signup(username, email, password, contact) {
    
      var payload = new FormData();
      payload.append("type", 'signup');
      payload.append('username', username);
      payload.append('email', email);
      payload.append('password', password);
      payload.append('contact', contact);
      return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }

  importCsv(csv,stype){
    console.log(csv);

    var payload = new FormData();
    
      payload.append("type", 'importcsv');
      payload.append("stype",stype);
      payload.append('csv', csv);

      let headers = new Headers();
      
      headers.append('Accept', 'application/json, text/plain,');
      let options = new RequestOptions({ headers: headers });
      
      return this.http.post(this.baseUrl, payload,options
    ).map((res: Response) => res.json());
  }

  exportCsv(stype,productRange) {
    var payload = new FormData();    
    payload.append("type", 'exportcsv');
    payload.append("stype", stype);
    payload.append("range", productRange);
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }

  getProductByID(id) {
    var payload = new FormData();    
    payload.append("type", 'getProductByID');
    payload.append('productId', id);
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }
  getProductBySKU(id) {
    var payload = new FormData();    
    payload.append("type", 'getProductBySKU');
    payload.append('productId', id);
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }

  productList(start,limit,page) {
    console.log(start,limit);
    var payload = new FormData();    
    payload.append("type", 'product_list_view');
    payload.append("start", start);
    payload.append("limit", limit);
    payload.append("page", page);
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }

  //id,sku,title,image1,image2,image3,image4,image5,image6,image7,eBay_Category_Id,qty,ref_Id,item_specific_1_name,item_specific_2_name,item_specific_3_name,item_specific_4_name,item_specific_5_name,item_specific_6_name,item_specific_7_name,item_specific_8_name,item_specific_9_name,store_category_name,gmo_brand,gmo_mpn,gmo_category,item_specific_1_value,item_specific_2_value,item_specific_3_value,item_specific_4_value,item_specific_5_value,item_specific_6_value,item_specific_7_value,item_specific_8_value,item_specific_9_value,description,stype=null
  updateProductSku(id,sku,title,image1,image2,image3,image4,image5,image6,image7,eBay_Category_Id,ref_Id,item_specific_1_name,item_specific_2_name,item_specific_3_name,item_specific_4_name,item_specific_5_name,item_specific_6_name,item_specific_7_name,item_specific_8_name,item_specific_9_name,store_category_name,gmo_brand,gmo_mpn,gmo_category,item_specific_1_value,item_specific_2_value,item_specific_3_value,item_specific_4_value,item_specific_5_value,item_specific_6_value,item_specific_7_value,item_specific_8_value,item_specific_9_value,description,stype=null){
    // console.log(item_specific_1_value);
    var payload = new FormData();    
    payload.append("type", 'update_product');
    payload.append("stype", stype);
    payload.append("id", id);
    payload.append("sku", sku);
    payload.append("title",title );
    payload.append("image1",image1 );
    payload.append("image2",image2 );
    payload.append("image3",image3 );
    payload.append("image4",image4 );
    payload.append("image5",image5 );
    payload.append("image6",image6 );
    payload.append("image7",image7 );
    payload.append("item_specific_1_name",item_specific_1_name );
    payload.append("item_specific_2_name",item_specific_2_name );
    payload.append("item_specific_3_name",item_specific_3_name );
    payload.append("item_specific_4_name",item_specific_4_name );
    payload.append("item_specific_5_name",item_specific_5_name );
    payload.append("item_specific_6_name",item_specific_6_name );
    payload.append("item_specific_7_name",item_specific_7_name );
    payload.append("item_specific_8_name",item_specific_8_name );
    payload.append("item_specific_9_name",item_specific_9_name );
    
   

    payload.append("store_category_name",store_category_name );
    payload.append("gmo_brand",gmo_brand );
    payload.append("gmo_mpn",gmo_mpn );
    payload.append("gmo_category",gmo_category );

    payload.append("description",description );


    payload.append("item_specific_1_value",item_specific_1_value );
    payload.append("item_specific_2_value",item_specific_2_value );
    payload.append("item_specific_3_value",item_specific_3_value );
    payload.append("item_specific_4_value",item_specific_4_value );
    payload.append("item_specific_5_value",item_specific_5_value );
    payload.append("item_specific_6_value",item_specific_6_value );
    payload.append("item_specific_7_value",item_specific_7_value );
    payload.append("item_specific_8_value",item_specific_8_value );
    payload.append("item_specific_9_value",item_specific_9_value );

    // payload.append("image3",image3 );
    // payload.append("image4",image4 );
    // payload.append("image5",image5 );
    // payload.append("image6",image6 );
    // payload.append("image7",image7 );
    payload.append("eBay_Category_Id", eBay_Category_Id);
    // payload.append("qty", qty);
    payload.append("ref_Id", ref_Id);
    // payload.append("ref_Type", ref_Type);

    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
  }

  
  soldProductList() {
    var payload = new FormData();    
    payload.append("type", 'sold_list_view');
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }

  taskList() {
    var payload = new FormData();    
    payload.append("type", 'task_list_view');
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }

  addTicket(title,assigned_user,action,description,sku) {
    var payload = new FormData();    
    payload.append("type", "add_ticket");
    payload.append("title", title);
    payload.append("assigned_user", assigned_user);
    payload.append("action", action);
    //payload.append("status", status);
    payload.append("description", description);
    payload.append("sku", sku);
    // payload.append("ticket_type", type);
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }
  


  getTicketByID(id) {
    var payload = new FormData();    
    payload.append("type", 'getTicketByID');
    payload.append('ticketId', id);
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }

  updateTicketByID(id,title,assigned_user,action,status,description,sku) {
    var payload = new FormData();    
    payload.append("type", 'updateTicketByID');
    //`TaskID`, `Title`, `SKU`, `Description`, `Assigned_user`, `Action`, `Status`, `Date_added`
    payload.append('TaskID', id);
    payload.append('Title', title);
    payload.append('SKU',sku);
    payload.append('Assigned_user', assigned_user);
    payload.append('Description', description);
    payload.append('Action', action);
    payload.append('Status', status);

    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }

  getSaleHistoryByID(id) {
    var payload = new FormData();    
    payload.append("type", 'getsaleHistoryByID');
    payload.append('id', id);
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }
  
  updateSale(id,itemNumber,type,image1,sku,title,sold,watchers,viewers,tag){
    var payload = new FormData();    
    payload.append("type", 'updateSaleByID');
    payload.append("itemNumber", itemNumber);
    payload.append("Type", type);
    payload.append("id", id);
    payload.append("image1", image1);
    payload.append("sku", sku);
    payload.append("title", title);
    payload.append("sold", sold);
    payload.append("watchers", watchers);
    payload.append("viewers", viewers);
    payload.append("tag", tag);

    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
  }


  deleteTicket(id){
    var payload = new FormData();    
    payload.append("type", 'deleteTicketByID');
    payload.append('id', id);
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }

  customOrderList(){
    var payload = new FormData();    
    payload.append("type", 'custom_order_list_view');
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
  }


  addOrder(ticket_stage,svg_image,jpg_image,special_instruction,design_window_check,color,size,ebay_user_id,selling_price,material_price,packaging_used,material_height,material_width,postage_cost,estimated_ebay,gross_profit,ebay_message_history) {
    var payload = new FormData();    
    payload.append("type", "add_order");
    // payload.append("user_id", user_id);
    payload.append("ticket_stage", ticket_stage);
    payload.append("svg_image", svg_image);
    payload.append("jpg_image", jpg_image);
    payload.append("special_instruction", special_instruction);
    payload.append("design_window_check", design_window_check);
    payload.append("color", color);
    payload.append("size", size);
    payload.append("ebay_user_id", ebay_user_id);
    payload.append("selling_price", selling_price);
    payload.append("material_price", material_price);
    payload.append("packaging_used", packaging_used);
    payload.append("material_height", material_height);
    payload.append("material_width", material_width);
    payload.append("postage_cost", postage_cost);
    payload.append("estimated_ebay", estimated_ebay);
    payload.append("gross_profit", gross_profit);
    payload.append("ebay_message_history", ebay_message_history);
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
    
  }

  getOrderById(id){
    var payload = new FormData();    
    payload.append("type", 'getOrderByID');
    payload.append('id', id);
    return this.http.post(this.baseUrl, payload
    ).map((res: Response) => res.json());
  }

  updateorderById(id,svg_file,jpg_file,packaging_used,instructions,design_window_check,design_window_color,design_window_size,ebay_msg_history,ebay_user_id,estimated_ebay,gross_profit,material_height,material_price,material_width,postage_cost,selling_price,ticket_stage){
    var payload = new FormData();   
    payload.append("type", "update_order");
    payload.append('id', id);
    payload.append('svg_file', svg_file );
    payload.append('jpg_file', jpg_file );
    payload.append('packaging_used', packaging_used);
    payload.append('instructions', instructions );
    payload.append('design_window_check', design_window_check);
    payload.append('design_window_color', design_window_color );
    payload.append('design_window_size', design_window_size );
    payload.append('ebay_msg_history', ebay_msg_history );
    payload.append('ebay_user_id', ebay_user_id);
    payload.append('estimated_ebay', estimated_ebay);
    payload.append('gross_profit', gross_profit);
    payload.append('material_height', material_height);
    payload.append('material_price', material_price);
    payload.append('material_width', material_width);
    payload.append('postage_cost', postage_cost );
    payload.append('selling_price', selling_price );
    payload.append('ticket_stage', ticket_stage );
    return this.http.post(this.baseUrl, payload
      ).map((res: Response) => res.json());

  }
}
