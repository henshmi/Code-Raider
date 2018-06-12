import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrdersContainerComponent } from './components/orders-container/orders-container.component';
import { SharedModule } from 'shared/shared.module';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';

const ordersRoutes = [
  {
    path: 'orders', component: MyOrdersComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(
      ordersRoutes
    )
  ],
  declarations: [
    MyOrdersComponent,
    OrderCardComponent,
    OrdersContainerComponent
  ]
})
export class OrdersModule { }
