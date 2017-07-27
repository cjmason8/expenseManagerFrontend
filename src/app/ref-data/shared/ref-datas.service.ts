import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

@Injectable()
export class RefDatasService {

  private url: string = environment.backendEndPoint;
  private refDatasUrl: string = environment.backendEndPoint + "/refDatas";
  private usersUrl: string = environment.backendEndPoint + "/users";

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

  authenticate(token){
    if (!token) {
      this.router.navigate(['login']);
    }

    return this.http.get(this.getAuthenticateUrl(token))
      .map(res => res.json())
      .subscribe(result => {
        if (result.status === 'failed') {
          this.router.navigate(['login']);
        }
      });;
  }

  addRefData(refData){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.refDatasUrl, JSON.stringify(refData), options)
      .map(res => res.json());
  }

  updateRefData(refData){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.put(this.getRefDataUrl(refData.id), JSON.stringify(refData), options)
      .map(res => res.json());
  }

  deleteRefData(id){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.delete(this.getRefDataUrl(id), options)
      .map(res => res.json());
  }

  getRefData(id){
    return this.http.get(this.getRefDataUrl(id))
      .map(res => res.json());
  }

  getRefDatas(){
    return this.http.get(this.refDatasUrl)
      .map(res => res.json());
  }  

  private getRefDataUrl(id){
    return this.refDatasUrl + "/" + id;
  }

  private getAuthenticateUrl(token){
    return this.usersUrl + "/" + token + "/authenticate";
  }

  getTypes(type){
    return this.http.get(this.refDatasUrl + '/type/' + type)
      .map(res => res.json());
  }
}
