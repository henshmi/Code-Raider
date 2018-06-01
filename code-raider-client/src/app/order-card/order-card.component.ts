import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderModel } from '../models/order.model';
import { PopulatedOrderModel } from '../models/populatedorder.model';

@Component({
  selector: 'order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  @Input('order') order;
  @Output('confirm') confirm = new EventEmitter();
  @Output('cancel') cancel = new EventEmitter();

  constructor() {
    this.order = new PopulatedOrderModel();
  }

  ngOnInit() {
  }

  confirmOrder() {
    this.confirm.emit(this.order._id);
  }

  cancelOrder() {
    this.cancel.emit(this.order._id);
  }

}
