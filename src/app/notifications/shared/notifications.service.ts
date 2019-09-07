import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { Notification } from './notification'
import { Observable } from 'rxjs/Rx';

import { HttpClient } from "@angular/common/http"

@Injectable()
export class NotificationsService {

  private notificationsUrl: string = environment.backendEndPoint + "/notifications";

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.notificationsUrl);
  }

  markRead(id): Observable<Notification> {
    let reqUrl = this.notificationsUrl + "/markRead/" + id;
    return this.http.get<Notification>(reqUrl);
  }

  markUnRead(id): Observable<Notification> {
    let reqUrl = this.notificationsUrl + "/markUnRead/" + id;
    return this.http.get<Notification>(reqUrl);
  }

}
