import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'
import { Expense } from './expense'

import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable()
export class ExpensesService {

  private url: string = environment.backendEndPoint;
  private expensesUrl: string = environment.backendEndPoint + "/expenses";

  constructor(private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute) { }

  getExpense(id): Observable<Expense> {
    return this.http.get<Expense>(this.getExpenseUrl(id));
  }

  payExpense(id): Observable<Expense> {
    let reqUrl = this.expensesUrl + "/pay/" + id;
    return this.http.get<Expense>(reqUrl);
  }

  unPayExpense(id): Observable<Expense> {
    let reqUrl = this.expensesUrl + "/unpay/" + id;
    return this.http.get<Expense>(reqUrl);
  }  

  addExpense(expense): Observable<Expense> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<Expense>(this.expensesUrl, JSON.stringify(expense), { headers });
  }

  updateExpense(expense): Observable<Expense> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.put<Expense>(this.getExpenseUrl(expense.id), JSON.stringify(expense), { headers });
  }

  deleteExpense(id): Observable<Expense> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.delete<Expense>(this.getExpenseUrl(id), { headers });
  }

  findExpenses(searchParams): Observable<Expense[]> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<Expense[]>(this.expensesUrl + '/search', JSON.stringify(searchParams), { headers });
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.expensesUrl);
  }     

  private getExpenseUrl(id){
    return this.expensesUrl + "/" + id;
  }

}
