import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { UserModel } from 'shared/models/user.model';
import { Router } from '@angular/router';
import { AppError } from '../../errors/app-error';
import { ForbiddenError } from '../../errors/forbidden-error';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
  }

  signup(formData) {

    const value = formData.value;

    if (value.password !== value.confirmPassword) {
      formData.form.controls['confirmPassword'].setErrors({'dontmatch': true});
      return;
    }

    const user: UserModel = new UserModel(value.email, value.password);

    this.auth.signUp(user)
    .subscribe(response => {
      this.auth.setSession(response);
      this.redirect();
    },
    (error: AppError) => {
      if (error instanceof ForbiddenError) {
        formData.form.setErrors({'alreadyInUse': true});
      }
    });
  }

  private redirect() {
    this.router.navigate(['/']);
  }

}
