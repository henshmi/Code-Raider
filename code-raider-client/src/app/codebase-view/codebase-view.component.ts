import { Component, OnInit } from '@angular/core';
import { CodebaseService } from '../services/codebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CodeBaseModel } from '../models/code-base-model.model';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { OrderModel } from '../models/order.model';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { AppAlertsService, AppAlert } from '../services/app-alerts.service';

@Component({
  selector: 'app-codebase-view',
  templateUrl: './codebase-view.component.html',
  styleUrls: ['./codebase-view.component.css']
})
export class CodebaseViewComponent implements OnInit {

  codeBase;

  constructor(
    private auth: AuthService,
    private codebaseService: CodebaseService,
    private orderService: OrderService,
    private alertService: AppAlertsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.codeBase = new CodeBaseModel();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('_id');
    if (id) {
      this.codebaseService.getCodebase(id)
      .take(1)
      .subscribe(codebase => {
        this.codeBase = codebase[0];
      });
    }
  }

  order() {
    const orderModel = new OrderModel(this.codeBase._id);
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
}
