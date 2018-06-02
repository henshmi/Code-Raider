import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {DataTableModule} from 'angular-6-datatable';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CodeBaseCardComponent } from './home/codebase-card/codebase-card.component';
import { DiscoverComponent } from './discover/discover.component';
import { SearchFormComponent } from './discover/search-form/search-form.component';
import { CodeBaseFormComponent } from './codebase-form/codebase-form.component';
import { TrendingTagsChartComponent } from './trending-tags-chart/trending-tags-chart.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { SignupComponent } from './signup/signup.component';
import { PageContentDirective } from './directives/page-content.directive';
import { DataService } from './services/data.service';
import { AuthGuard } from './services/auth-guard.service';
import { CodebaseService } from './services/codebase.service';
import { AppErrorHandler } from './common/app-error-handler';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { CodebaseViewComponent } from './codebase-view/codebase-view.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrderService } from './services/order.service';
import { CodebasesContainerComponent } from './codebases-container/codebases-container.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { OrdersContainerComponent } from './orders-container/orders-container.component';
import { TagsService } from './services/tags.service';
import { AdminAnalyticsComponent } from './admin/admin-analytics/admin-analytics.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { UserService } from './services/user.service';
import { AdminPushNotificationComponent } from './admin-push-notification/admin-push-notification.component';

const appRoutes: Routes = [
  {
    path: 'codebases/new',
    component: CodeBaseFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'codebases/view/:_id',
    component: CodebaseViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'codebases/edit/:_id',
    component: CodeBaseFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
    children: [
      {path: '', component: AdminAnalyticsComponent},
      {path: 'users', component: AdminUsersComponent},
      {path: 'orders', component: AdminOrdersComponent},
      {path: 'notify', component: AdminPushNotificationComponent}
    ]
  },
  {
    path: 'orders', component: MyOrdersComponent,
    canActivate: [AuthGuard]
  },
  { path: 'codebases', component: DiscoverComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    CodeBaseCardComponent,
    DiscoverComponent,
    SearchFormComponent,
    CodeBaseFormComponent,
    TrendingTagsChartComponent,
    LoginComponent,
    SignupComponent,
    PageContentDirective,
    CodebaseViewComponent,
    AdminDashboardComponent,
    CodebasesContainerComponent,
    MyOrdersComponent,
    OrderCardComponent,
    OrdersContainerComponent,
    AdminAnalyticsComponent,
    AdminUsersComponent,
    AdminOrdersComponent,
    AdminPushNotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TagInputModule,
    DataTableModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    AdminAuthGuard,
    CodebaseService,
    OrderService,
    TagsService,
    UserService,
    { provide: ErrorHandler, useClass: AppErrorHandler},
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
