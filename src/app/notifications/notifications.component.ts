import { Component } from '@angular/core';
import {NotificationsService} from "./shared/notifications.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { Notification } from "./shared/notification";
import {CookieService} from 'angular2-cookie/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticateComponent } from '../shared/authenticate.component';

@Component({
 selector: 'app-notifications',
 templateUrl: './notifications.component.html',
 styleUrls: ['./notifications.component.css'],
 providers: []
})
export class NotificationsComponent extends AuthenticateComponent {
  public notifications: Notification[] = [];

  constructor(authenticateService: AuthenticateService, private notificationsService: NotificationsService, 
  private route: ActivatedRoute, _cookieService:CookieService) { 
      super(authenticateService, _cookieService);
  }

 ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      this.notificationsService.getNotifications()
        .subscribe(data => {
          this.notifications = data;
        });
    });
 }

 markRead(notification) {
  this.notificationsService.markRead(notification.id)
    .subscribe((res) => {
      notification.read = true;
    });
 }

 markUnRead(notification) {
  this.notificationsService.markUnRead(notification.id)
    .subscribe((res) => {
      notification.read = false;
    });
 }

}