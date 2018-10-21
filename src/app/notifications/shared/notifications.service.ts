import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

import { HttpInterceptor } from "../../shared/http.interceptor"

@Injectable()
export class NotificationsService {

  private notificationsUrl: string = environment.backendEndPoint + "/notifications";

  constructor(private http: HttpInterceptor) { }

  getNotifications(){
    return this.http.get(this.notificationsUrl)
      .map(res => res.json());
  }

  markRead(id){
    let reqUrl = this.notificationsUrl + "/markRead/" + id;
    return this.http.get(reqUrl)
      .map(res => res.json());
  }

  markUnRead(id){
    let reqUrl = this.notificationsUrl + "/markUnRead/" + id;
    return this.http.get(reqUrl)
      .map(res => res.json());
  }

}
