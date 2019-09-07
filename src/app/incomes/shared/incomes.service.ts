import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'
import { Income } from './income'

import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable()
export class IncomesService {

  private url: string = environment.backendEndPoint + "/incomes";

  constructor(private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute) { }

  getIncome(id): Observable<Income> {
    return this.http.get<Income>(this.getIncomeUrl(id));
  }

  addIncome(income): Observable<Income> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<Income>(this.url, JSON.stringify(income), { responseType: 'json', headers: headers });
  }

  updateIncome(income): Observable<Income> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.put<Income>(this.getIncomeUrl(income.id), JSON.stringify(income), { responseType: 'json', headers: headers });
  }

  deleteIncome(id): Observable<Income> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.delete<Income>(this.getIncomeUrl(id), { responseType: 'json', headers: headers });
  }

  private getIncomeUrl(id){
    return this.url + "/" + id;
  }

}
