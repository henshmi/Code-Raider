import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrders;

  constructor(private orderService: OrderService) {
    this.myOrders = [];
  }

  ngOnInit() {
    this.orderService.getAll()
    .subscribe(orders => {
      this.myOrders = orders;
    });
  }

}
