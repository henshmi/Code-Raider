import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminAnalyticsComponent } from 'admin/components/admin-analytics/admin-analytics.component';
import { AdminDashboardComponent } from 'admin/components/admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from 'admin/components/admin-orders/admin-orders.component';
import { AdminPushNotificationComponent } from 'admin/components/admin-push-notification/admin-push-notification.component';
import { AdminUsersComponent } from 'admin/components/admin-users/admin-users.component';
import { TrendingTagsChartComponent } from 'admin/components/trending-tags-chart/trending-tags-chart.component';
import { AdminAuthGuard } from 'admin/services/admin-auth-guard.service';
import { DataTableModule } from 'angular-6-datatable';
import { ChartsModule } from 'ng2-charts';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

const adminRoutes = [
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
    children: [
      {path: '', component: AdminAnalyticsComponent},
      {path: 'users', component: AdminUsersComponent},
      {path: 'orders', component: AdminOrdersComponent},
      {path: 'notify', component: AdminPushNotificationComponent}
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    ChartsModule,
    DataTableModule,
    RouterModule.forChild(
      adminRoutes
    )
  ],
  declarations: [
    AdminDashboardComponent,
    AdminAnalyticsComponent,
    AdminUsersComponent,
    AdminOrdersComponent,
    AdminPushNotificationComponent,
    TrendingTagsChartComponent
  ],
  exports: [
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
