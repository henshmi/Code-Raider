import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';
import { UnauthorizedError } from '../common/unauthorized-error';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => this.returnUrl = params['returnUrl'] || '/');
  }

  submit(formData) {

    const user: UserModel = new UserModel(
      formData.value.email,
      formData.value.password
    );

    this.auth.signin(user)
    .subscribe(data => {
      this.auth.setSession(data);
      this.redirect();
    },
    (error: AppError) => {
      if (error instanceof UnauthorizedError) {
        formData.form.setErrors({'incorrect': true });
      } else {
         throw error;
      }
    });
  }

  private redirect() {
    this.router.navigate([this.returnUrl]);
    this.returnUrl = null;
  }

}
