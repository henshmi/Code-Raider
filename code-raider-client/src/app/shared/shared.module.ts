import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CodeBaseCardComponent } from 'shared/components/codebase-card/codebase-card.component';
import { CodebasesContainerComponent } from 'shared/components/codebases-container/codebases-container.component';
import { SearchFormComponent } from 'shared/components/search-form/search-form.component';
import { PageContentDirective } from 'shared/directives/page-content.directive';
import { AddressService } from 'shared/services/address.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CodebaseService } from 'shared/services/codebase.service';
import { NotificationService } from 'shared/services/notification.service';
import { OrderService } from 'shared/services/order.service';
import { TagsService } from 'shared/services/tags.service';
import { UserService } from 'shared/services/user.service';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    CodeBaseCardComponent,
    SearchFormComponent,
    PageContentDirective,
    CodebasesContainerComponent
  ],
  exports: [
    CodeBaseCardComponent,
    CodebasesContainerComponent,
    SearchFormComponent,
    PageContentDirective,
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot().ngModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CodebaseService,
    OrderService,
    TagsService,
    UserService,
    NotificationService,
    AddressService,
    ToastrService
  ]
})
export class SharedModule { }
