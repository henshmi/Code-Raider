import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodeBaseModel } from '../models/code-base-model.model';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';
import { UnauthorizedError } from '../common/unauthorized-error';
import { ForbiddenError } from '../common/forbidden-error';
import { AppError } from '../common/app-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private url) { }

  get(id) {
    return this.http.get(this.url + '/' + id);
  }

  getAll(route = '', params = {}) {
    return this.http.get(this.url + route, {
      params: params
    });
  }

  post(params, route = '') {
    return this.http.post(this.url + route, params);
  }

  patch(id, params) {
    return this.http.patch(this.url + '/' + id, params);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id);
  }

  protected handleError(error: Response) {
    if (error.status === 404) {
      return Observable.throw(new NotFoundError(error));
    }
    if (error.status === 400) {
      return Observable.throw(new BadRequestError(error));
    }
    if (error.status === 401) {
      return Observable.throw(new UnauthorizedError(error));
    }
    if (error.status === 403) {
      return Observable.throw(new ForbiddenError(error));
    }
    return Observable.throw(new AppError(error));
  }
}
