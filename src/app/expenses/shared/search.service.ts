import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

@Injectable()
export class SearchService {

  private searchUrl: string = environment.backendEndPoint + "/search";

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

  findSearchResults(searchParams) {
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.searchUrl, JSON.stringify(searchParams), options)
      .map(res => res.json());
  }

}
