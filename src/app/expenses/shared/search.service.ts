import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

import { HttpClient, HttpHeaders} from "@angular/common/http"
import { ExpenseGraph } from './expenseGraph';

@Injectable()
export class SearchService {

  private searchUrl: string = environment.backendEndPoint + "/search";

  constructor(private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute) { }

  findSearchResults(searchParams): Observable<ExpenseGraph> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<ExpenseGraph>(this.searchUrl, JSON.stringify(searchParams), { responseType: 'json', headers });
  }

}
