import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { environment } from '../../environments/environment'
import { UserAuthenticate } from './userAuthenticate'

import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable()
export class AuthenticateService {

  authenticated: boolean = false;
  hasNotifications: boolean = false;
  notifications: Notification[] = [];
  user: string = "";

  constructor(private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute,
      private _cookieService:CookieService) { }

  authenticate(token) {
    if (!token) {
      this.authenticated = false;
      this.router.navigate(['login']);
    }

    this.http.get<Notification[]>(environment.backendEndPoint + "/notifications")
      .subscribe(data => {
        this.hasNotifications = data.length > 0;
      });

    return this.http.get<UserAuthenticate>(environment.backendEndPoint + "/users/" + token + "/authenticate")
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

  loginUser(login): Observable<UserAuthenticate> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<UserAuthenticate>(environment.backendEndPoint + "/login", JSON.stringify(login), { responseType: 'json', headers: headers })
      .map(res => {
        this.user = res.user;

        return res;
      });
  }

}
