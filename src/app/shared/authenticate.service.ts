import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { environment } from '../../environments/environment'

import { HttpInterceptor } from "./http.interceptor"

@Injectable()
export class AuthenticateService {

  authenticated: boolean = false;
  hasNotifications: boolean = false;
  notifications: Notification[] = [];
  user: string = "";

  constructor(private http: HttpInterceptor,
      private router: Router,
      private route: ActivatedRoute,
      private _cookieService:CookieService) { }

  authenticate(token) {
    if (!token) {
      this.authenticated = false;
      this.router.navigate(['login']);
    }

    this.http.get(environment.backendEndPoint + "/notifications")
      .map(res => res.json()).subscribe(data => {
        this.hasNotifications = data.length > 0;
      });

    return this.http.get(environment.backendEndPoint + "/users/" + token + "/authenticate")
      .map(res => res.json())
      .subscribe(result => {
        if (result.status === 'failed') {
          this.authenticated = false;
          this.router.navigate(['login']);
          return;
        }

        this.user = result.user;
        this.authenticated = true;
      });
  }

  loginUser(login) {
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(environment.backendEndPoint + "/login", JSON.stringify(login), options)
      .map(res => {
        let result = res.json();
        this.user = result.user;

        return result;
      });
  }

}
