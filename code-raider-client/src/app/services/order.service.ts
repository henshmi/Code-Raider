import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';
import { UnauthorizedError } from '../common/unauthorized-error';
import { ForbiddenError } from '../common/forbidden-error';
import { AppError } from '../common/app-error';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends DataService {

  constructor(
    http: HttpClient
  ) {
    super(http, 'http://localhost:8080/api/orders');
  }

  getMyOrders(params = {}) {
    return this.getAll('/myorders', params)
    .catch(this.handleError);
  }

  addOrder(order: OrderModel) {
    return this.post(order, '/new')
    .catch(this.handleError);
  }

  confirmOrder(id) {
    return this.post({confirmed: true}, '/confirm/' + id)
    .catch(this.handleError);
  }

  cancelOrder(id) {
    return this.delete(id)
    .catch(this.handleError);
  }

}
