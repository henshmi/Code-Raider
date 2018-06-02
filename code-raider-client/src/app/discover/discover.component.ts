import { Component, OnInit } from '@angular/core';
import { CodebaseService } from '../services/codebase.service';
import { OrderService } from '../services/order.service';
import { OrderModel } from '../models/order.model';

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
    this.codebaseService.getAll('', params)
    .subscribe(codebases => {
      this.codebases = codebases;
    });
  }

}
