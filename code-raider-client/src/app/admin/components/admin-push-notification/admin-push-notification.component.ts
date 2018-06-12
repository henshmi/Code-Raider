import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'shared/services/notification.service';
import { AppAlertsService, AppAlert } from 'shared/services/app-alerts.service';

@Component({
  selector: 'app-admin-push-notification',
  templateUrl: './admin-push-notification.component.html',
  styleUrls: ['./admin-push-notification.component.css']
})
export class AdminPushNotificationComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private alertService: AppAlertsService) { }

  ngOnInit() {
  }

  submit(notification) {
    this.notificationService
    .pushNotification({notification})
    .subscribe(response => {
      this.alertService.success(AppAlert.notificationSent);
    });
  }

}
