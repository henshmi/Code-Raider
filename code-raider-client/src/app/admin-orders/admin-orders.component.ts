import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: any = [];

  constructor(private orderService: OrderService) {
    this.orderService.getAll()
    .subscribe( orders => this.orders = orders);
  }

  ngOnInit() {
  }

  cancelOrder(id) {

    if (!confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    this.orderService
    .cancelOrder(id)
    .subscribe(response => {

      let index = -1;

      for (let i = 0 ; i < this.orders.length ; i++ ) {
        if (this.orders[i]._id === id ) {
          index = i;
          break;
        }
      }

      this.orders.splice(index, 1);
    });
  }

}
