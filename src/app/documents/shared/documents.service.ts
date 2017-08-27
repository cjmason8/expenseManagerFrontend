import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

@Injectable()
export class DocumentsService {

  private documentsUrl: string = environment.backendEndPoint + "/document";

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute) { }

  getDocuments(){
    return this.http.get(this.documentsUrl)
      .map(res => res.json());
  }
}