import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrders;
  filteredOrders;

  constructor(private orderService: OrderService) {
    this.myOrders = [];
    this.filteredOrders = [];
  }

  ngOnInit() {
    this.orderService.getMyOrders()
    .subscribe(orders => {
      this.myOrders = orders;
      this.filteredOrders = orders;
    });
  }

  filter(params) {

    params.tag = params.tag ? params.tag.replace('+', '\\+').toLowerCase() : '';
    params.minprice = params.minprice ? params.minprice : 0;
    params.maxprice = params.maxprice ? params.maxprice : 1000000;

    this.filteredOrders = this.myOrders
    .filter(order => {

      let valid = true;

      valid = valid && order.codebase.price >= params.minprice;
      valid = valid && order.codebase.price <= params.maxprice;

      if (params.tag) {
        valid = valid && order.codebase.tags.some(tag => {
          return tag.toLowerCase().match('.*' + params.tag + '.*');
        });
      }

      return valid;
    });
  }

}
