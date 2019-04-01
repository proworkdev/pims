import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import { ProductimagesComponent } from './productimages.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SoldProductComponent } from './sold-product/sold-product.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { CsvoperationComponent } from './csvoperation.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { EditSaleComponent } from './edit-sale/edit-sale.component';

import { CustomOrderComponent } from './custom-order/custom-order.component';
import { CreateOrderComponent } from './create-order/create-order.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Theme'
    },
    children: [
      {
        path: 'csvopt',
        component: CsvoperationComponent,
        data: {
          title: 'Operation',
          breadcrumb: CsvoperationComponent
        }
      },
      // {
      //   path: 'typography',
      //   component: TypographyComponent,
      //   data: {
      //     title: 'Typography'
      //   }
      // },
      {
        path: 'product',
        component: ProductComponent,
        data: {
          title: 'Product'
        }
      },
      { 
        path: 'edit-product/:id',
        component: EditProductComponent,
        data: {
          title: 'Edit Product'
        }
      },
      {
        path: 'productimages',
        component: ProductimagesComponent,
        data: {
          title: 'Product Images'
        }
      },
      {
        path: 'soldproduct',
        component: SoldProductComponent,
        data: {
          title: 'Sold Product'
        }
      },
      {
        path: 'taskmanager',
        component: TaskManagerComponent,
        data: {
          title: 'Sold Product'
        }
      },
      {
        path: 'createticket',
        component: CreateTicketComponent,
        data: {
          title: 'Create Ticket'
        }
      },
      {
        path: 'edit-sale/:id',
        component: EditSaleComponent,
        data: {
          title: 'Edit Sale'
        }
      },
      {
        path: 'customorder',
        component: CustomOrderComponent,
        data: {
          title: 'Custom Order'
        }
      },
      {
        path: 'createcustomorder',
        component: CreateOrderComponent,
        data: {
          title: 'Custom Order'
        }
      },
      {
        path: 'customorder/:id',
        component: CustomOrderComponent,
        data: {
          title: 'Edit Sale'
        }
      },
      
      
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
