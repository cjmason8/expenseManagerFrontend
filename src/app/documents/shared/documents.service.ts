import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, ResponseContentType } from '@angular/http';

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

  uploadFile(formData, options, type, path?) {
    let url = this.documentsUrl + '/upload?type=' + type;
    if (path) {
      url += '&path=' + path;
    }
    return this.http.post(url, formData, options)
          .map(res => res.json());
  } 

  getFile(id, type) {
    var headers = new Headers({ 'Content-Type': 'application/pdf', 'Accept': 'application/pdf' });

    let options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.Blob;
    return this.http.get(this.documentsUrl + '/get/' + type + '/' + id, options)
          .map((res) => {
            return new Blob([res.blob()], { type: 'application/pdf' })
        });
  } 

  getFileByPath(filePath) {
    var headers = new Headers({ 'Content-Type': 'application/pdf', 'Accept': 'application/pdf' });

    let options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.Blob;
    return this.http.post(this.documentsUrl + '/getByPath/', filePath, options)
          .map((res) => {
            return new Blob([res.blob()], { type: 'application/pdf' })
        });
  }   

  getDocuments(folderPath){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.documentsUrl, folderPath, options)
      .map(res => res.json());
  }

    createDirectory(directory, options) {
    let url = this.documentsUrl + '/directory/create';

    return this.http.post(url, directory, options)
          .map(res => res.json());
  } 

}