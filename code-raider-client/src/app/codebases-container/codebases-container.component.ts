import { Component, OnInit, Input } from '@angular/core';
import { CodebaseService } from '../services/codebase.service';
import { OrderService } from '../services/order.service';
import { OrderModel } from '../models/order.model';
import { CodeBaseModel } from '../models/code-base-model.model';
import { ToastrService } from 'ngx-toastr';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { AppAlertsService, AppAlert } from '../services/app-alerts.service';

@Component({
  selector: 'codebases-container',
  templateUrl: './codebases-container.component.html',
  styleUrls: ['./codebases-container.component.css']
})
export class CodebasesContainerComponent implements OnInit {

  @Input('codebases') codebases: CodeBaseModel[];

  constructor(
    private alertService: AppAlertsService,
    private codebaseService: CodebaseService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  codebaseOrdered(id) {
    const orderModel = new OrderModel(id);
    this.orderService.addOrder(orderModel)
    .subscribe((response: Response) => {
      this.alertService.success(AppAlert.orderAdded);
    },
    (error: AppError) => {
      if (error instanceof BadRequestError) {
        this.alertService.warning(AppAlert.orderAlreadyExists);
      }
    });
  }

  codebaseDeleted(id) {
    this.codebaseService.delete(id)
    .subscribe((response: Response) => {
      const index = this.codebases.indexOf(id);
      this.codebases.splice(index, 1);
      this.alertService.info(AppAlert.codebaseDeleted);
    });
  }
}
