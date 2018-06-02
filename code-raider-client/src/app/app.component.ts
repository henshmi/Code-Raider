import { Component } from '@angular/core';
import io from 'socket.io-client';
import { AppAlertsService } from './services/app-alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private ioUrl = 'http://localhost:8080';
  private socket;

  constructor(private alertService: AppAlertsService) {
    this.socket = io.connect(this.ioUrl);
    this.socket.on('notification', (notification) => {
      this.alertService.infoCustomMessage(notification, 'New notification from admin: ');
    });
  }

}
