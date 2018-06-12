import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum AppAlert {
  orderAdded,
  orderAlreadyExists,
  orderCanceled,
  orderConfirmed,

  codebaseAdded,
  codebaseDeleted,

  notificationSent
}

@Injectable({
  providedIn: 'root'
})
export class AppAlertsService {

  messages = [];

  constructor(private toastr: ToastrService) {

    // Orders
    this.messages[AppAlert.orderAdded] =  ['', 'New order added to "My orders".'];
    this.messages[AppAlert.orderAlreadyExists] = ['', 'You cannot order the same item more than once.'];
    this.messages[AppAlert.orderCanceled] =  ['', 'Order canceled.'];
    this.messages[AppAlert.orderConfirmed] = [
      'An email with the codebase that you ordered will be sent to you shortly',
      'Order confirmed.'
    ];

    // Codebases
    this.messages[AppAlert.codebaseAdded] =  ['', 'Codebase added to stock.'];
    this.messages[AppAlert.codebaseDeleted] = ['', 'Codebase deleted from stock.'];

    // Notifications
    this.messages[AppAlert.notificationSent] = [
      'Your message was sent to all users, and a new tweet was posted on twitter.',
      'Notification sent!'
    ];
  }

  success(alert: AppAlert) {
    const message = this.messages[alert];
    this.toastr.success(message[0], message[1]);
  }

  warning(alert: AppAlert) {
    const message = this.messages[alert];
    this.toastr.warning(message[0], message[1]);
  }

  info(alert: AppAlert) {
    const message = this.messages[alert];
    this.toastr.info(message[0], message[1]);
  }

  infoCustomMessage(message: string, title: string) {
    this.toastr.info(message, title);
  }
}
