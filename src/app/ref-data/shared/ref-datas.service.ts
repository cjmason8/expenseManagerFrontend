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

  private refDatasUrl: string = environment.backendEndPoint + "/refDatas";

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

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

  getTypes(type){
    return this.http.get(this.refDatasUrl + '/type/' + type)
      .map(res => res.json());
  }
}
