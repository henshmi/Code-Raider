import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends DataService {

  constructor(http: HttpClient) {
    super(http, 'http://localhost:8080/api/notifications');
  }

  pushNotification(notification) {
    return this.post(notification, '/new')
    .catch(this.handleError);
  }
}
