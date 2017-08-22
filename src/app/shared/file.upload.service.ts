import { Injectable } from '@angular/core';
import { Headers, RequestOptions, ResponseContentType, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { environment } from '../../environments/environment'

@Injectable()
export class FileUploadService {

  authenticated: boolean = false;

  constructor(private http: Http,
      private router: Router,
      private route: ActivatedRoute,
      private _cookieService:CookieService) { }

  uploadFile(formData, options, type) {
    return this.http.post(environment.backendEndPoint + '/file/upload?type=' + type, formData, options)
          .map(res => res.json());
  } 

  getFile(id, type) {
    var headers = new Headers({ 'Content-Type': 'application/pdf', 'Accept': 'application/pdf' });

    let options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.Blob;
    return this.http.get(environment.backendEndPoint + '/file/get/' + type + '/' + id, options)
          .map((res) => {
            return new Blob([res.blob()], { type: 'application/pdf' })
        });
  } 

}
