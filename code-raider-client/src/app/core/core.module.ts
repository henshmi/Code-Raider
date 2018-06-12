import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from 'core/components/about/about.component';
import { HomeComponent } from 'core/components/home/home.component';
import { LoginComponent } from 'core/components/login/login.component';
import { NavbarComponent } from 'core/components/navbar/navbar.component';
import { PageNotFoundComponent } from 'core/components/page-not-found/page-not-found.component';
import { SignupComponent } from 'core/components/signup/signup.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    AgmCoreModule,
    SharedModule,
    RouterModule.forChild(
      [
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: SignupComponent },
        { path: 'about', component: AboutComponent },
        { path: '', component: HomeComponent },
        { path: '**', component: PageNotFoundComponent }
      ]
    ),
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
