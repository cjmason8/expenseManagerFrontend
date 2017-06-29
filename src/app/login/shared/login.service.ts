import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment'

@Injectable()
export class LoginService {

  private url: string = environment.backendEndPoint + "/login";

  constructor(private http: Http) { }

  loginUser(login){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, JSON.stringify(login), options)
      .map(res => res.json());
  }

}
