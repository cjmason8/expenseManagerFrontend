import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment'

@Injectable()
export class AuthenticateService {

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

  authenticate(token){
    if (!token) {
      this.router.navigate(['login']);
    }

    return this.http.get(environment.backendEndPoint + "/users/" + token + "/authenticate")
      .map(res => res.json())
      .subscribe(result => {
        if (result.status === 'failed') {
          this.router.navigate(['login']);
        }
      });;
  }

}
