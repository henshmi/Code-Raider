import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { AppAlertsService, AppAlert } from '../services/app-alerts.service';


@Component({
  selector: 'orders-container',
  templateUrl: './orders-container.component.html',
  styleUrls: ['./orders-container.component.css']
})
export class OrdersContainerComponent implements OnInit {

  @Input('orders') orders;
  @Input('confirmed') confirmed;

  constructor(
    private orderService: OrderService,
    private alertService: AppAlertsService) { }

  ngOnInit() {
  }

  confirmOrder(id) {
    this.orderService.confirmOrder(id)
    .subscribe(response => {

      let index = -1;
      for (let i = 0 ; i < this.orders.length ; i++ ) {
        if (this.orders[i]._id === id) {
          index = i;
          break;
        }
      }

      this.orders[index].confirmed = true;

      this.alertService.success(AppAlert.orderConfirmed);

    });
  }

  cancelOrder(id) {
    this.orderService.cancelOrder(id)
    .subscribe(response => {

      let index = -1;
      for (let i = 0 ; i < this.orders.length ; i++ ) {
        if (this.orders[i]._id === id) {
          index = i;
          break;
        }
      }
      this.orders.splice(index, 1);
      this.alertService.info(
        AppAlert.orderCanceled
      );
  });
}

}
