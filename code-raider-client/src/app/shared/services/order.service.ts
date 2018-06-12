import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotFoundError } from '../../core/errors/not-found-error';
import { BadRequestError } from '../../core/errors/bad-request-error';
import { UnauthorizedError } from '../../core/errors/unauthorized-error';
import { ForbiddenError } from '../../core/errors/forbidden-error';
import { AppError } from '../../core/errors/app-error';
import { OrderModel } from 'shared/models/order.model';

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
