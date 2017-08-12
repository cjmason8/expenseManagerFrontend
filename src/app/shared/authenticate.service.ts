import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { environment } from '../../environments/environment'

@Injectable()
export class AuthenticateService {

  authenticated: boolean = false;

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute,
      private _cookieService:CookieService) { }

  authenticate(token){
    if (!token) {
      this.authenticated = false;
      this.router.navigate(['login']);
    }

    return this.http.get(environment.backendEndPoint + "/users/" + token + "/authenticate")
      .map(res => res.json())
      .subscribe(result => {
        if (result.status === 'failed') {
          this.authenticated = false;
          this.router.navigate(['login']);
          return;
        }

        this.authenticated = true;
      });
  }

  loginUser(login){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(environment.backendEndPoint + "/login", JSON.stringify(login), options)
      .map(res => res.json());
  }

}
