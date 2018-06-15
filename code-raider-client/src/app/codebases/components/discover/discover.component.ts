import { Component, OnInit } from '@angular/core';
import { CodebaseService } from 'shared/services/codebase.service';
import { OrderService } from 'shared/services/order.service';
import { OrderModel } from 'shared/models/order.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  codebases: any;

  constructor(
    private codebaseService: CodebaseService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.codebaseService.getAll()
    .subscribe(codebases => {
      this.codebases = codebases;
    });
  }

  codebaseOrdered(id) {
    const orderModel = new OrderModel(id);
    this.orderService.addOrder(orderModel)
    .subscribe((response: string) => {
    });
  }

  codebaseDeleted(id) {
    this.codebaseService.delete(id)
    .subscribe((response: Response) => {
      const index = this.codebases.indexOf(id);
      this.codebases.splice(index, 1);
    });
  }

  filter(params) {
    const toSend = {
      tag: encodeURIComponent(params.tag);
      minprice: params.minprice;
      maxprice: params.maxprice;
    }

    this.codebaseService.getAll('', toSend)
    .subscribe(codebases => {
      this.codebases = codebases;
    });
  }

}
