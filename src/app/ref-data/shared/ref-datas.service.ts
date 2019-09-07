import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

import { HttpClient, HttpHeaders } from "@angular/common/http"
import { RefData } from './ref-data';

@Injectable()
export class RefDatasService {

  private refDatasUrl: string = environment.backendEndPoint + "/refDatas";

  constructor(private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute) { }

  addRefData(refData): Observable<RefData> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<RefData>(this.refDatasUrl, JSON.stringify(refData), { responseType: 'json', headers: headers });
  }

  updateRefData(refData): Observable<RefData> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.put<RefData>(this.getRefDataUrl(refData.id), JSON.stringify(refData), { responseType: 'json', headers: headers });
  }

  deleteRefData(id): Observable<RefData> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.delete<RefData>(this.getRefDataUrl(id), { responseType: 'json', headers: headers });
  }

  getRefData(id): Observable<RefData> {
    return this.http.get<RefData>(this.getRefDataUrl(id));
  }

  getRefDatas(): Observable<RefData[]> {
    return this.http.get<RefData[]>(this.refDatasUrl);
  }  

  private getRefDataUrl(id){
    return this.refDatasUrl + "/" + id;
  }

  getTypes(type): Observable<RefData[]> {
    return this.http.get<RefData[]>(this.refDatasUrl + '/type/' + type);
  }

  findRefDatas(refData): Observable<RefData[]> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<RefData[]>(this.refDatasUrl + '/search', JSON.stringify(refData), { responseType: 'json', headers: headers });
  } 
}
