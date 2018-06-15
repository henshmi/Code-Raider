import { Component, OnInit, Input } from '@angular/core';
import { CodebaseService } from 'shared/services/codebase.service';
import { OrderService } from 'shared/services/order.service';
import { OrderModel } from 'shared/models/order.model';
import { CodeBaseModel } from 'shared/models/code-base-model.model';
import { ToastrService } from 'ngx-toastr';
import { AppError } from '../../../core/errors/app-error';
import { BadRequestError } from '../../../core/errors/bad-request-error';
import { AppAlertsService, AppAlert } from 'shared/services/app-alerts.service';

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
      let index = -1;
      for (let i = 0 ; i < this.codebases.length ; i++ ) {
        if (this.codebases[i]._id === id) {
          index = i;
          break;
        }
      }
      this.codebases.splice(index, 1);
      this.alertService.info(AppAlert.codebaseDeleted);
    });
  }
}
