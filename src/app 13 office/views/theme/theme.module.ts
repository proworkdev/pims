// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { ThemeComponent } from './theme.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormsModule }   from '@angular/forms';
import { ProductimagesComponent } from './productimages.component';
import { SoldProductComponent } from './sold-product/sold-product.component';
import { CsvoperationComponent } from './csvoperation.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { EditSaleComponent } from './edit-sale/edit-sale.component';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { NgxEditorModule } from 'ngx-editor';
import {DataTableModule} from "angular-6-datatable";
//import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TableComponent } from './table/table.component';
import { CustomOrderComponent } from './custom-order/custom-order.component';
import { CreateOrderComponent } from './create-order/create-order.component'; 

import { NgxAutoScrollModule } from "ngx-auto-scroll";

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    FormsModule,
    JasperoAlertsModule,
    NgxEditorModule,
    DataTableModule,
    Ng2SmartTableModule,
    NgxAutoScrollModule
  ],
  declarations: [
    ColorsComponent,
    TypographyComponent,
    ThemeComponent,
    ProductComponent,
    EditProductComponent,
    ProductimagesComponent,
    SoldProductComponent,
    CsvoperationComponent,
    TaskManagerComponent,
    CreateTicketComponent,
    EditSaleComponent,
    TableComponent,
    CustomOrderComponent,
    CreateOrderComponent
  ]
})
export class ThemeModule { }
