import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'shared/models/user.model';
import { DataService } from './data.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../../core/errors/app-error';
import { NotFoundError } from '../../core/errors/not-found-error';
import { BadRequestError } from '../../core/errors/bad-request-error';
import { UnauthorizedError } from '../../core/errors/unauthorized-error';
import { ForbiddenError } from '../../core/errors/forbidden-error';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService {
  signedIn: boolean;
  admin: boolean;

  constructor(
    private router: Router,
    http: HttpClient
  ) {
    super(http, 'http://localhost:8080/api/users');
    this.signedIn = false;

    const token = localStorage.getItem('token');
    if (token) {
      this.signedIn = true;
    }

    const admin = (localStorage.getItem('admin') === 'true');
    if (admin) {
      this.admin = true;
    }
   }

  signUp(user: UserModel) {
    return this.post(user, '/signup')
    .catch(this.handleError);
  }

  signin(user: UserModel) {

    return this.post(user, '/signin')
    .catch(this.handleError);
  }

  signOut() {
    localStorage.setItem('token', '');
    this.signedIn = false;
    this.admin = false;
  }

  public setSession(authResult) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('admin', authResult.isAdmin);
    this.signedIn = true;
    this.admin = authResult.isAdmin;
  }

  get SignedIn() {
    return this.signedIn;
  }


}
