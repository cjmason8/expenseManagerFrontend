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

  uploadFile(file, type, path?) {
    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let url = this.documentsUrl + '/upload?type=' + type;
    if (path) {
      url += '&path=' + path;
    }
  
    return this.http.post(url, formData, options)
          .map(res => res.json());
  } 

  getFile(id, type, filePath) {
    let mediaType = this.getMediaType(filePath);
    var headers = new Headers({ 'Content-Type': mediaType, 'Accept': mediaType });

    let options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.Blob;
    return this.http.get(this.documentsUrl + '/get/' + type + '/' + id, options)
          .map((res) => {
            return new Blob([res.blob()], { type: mediaType })
        });
  }

  getMediaType(filePath) {
    let mediaType = 'application/pdf';
    if (filePath.endsWith('doc') || filePath.endsWith('docx')) {
      mediaType = 'application/msword';
    }
    else if(filePath.endsWith('xls') || filePath.endsWith('xlsx')) {
      mediaType = 'application/vnd.ms-excel';
    }
    else if(filePath.endsWith('jpg') || filePath.endsWith('jpeg')) {
      mediaType = 'image/jpeg';
    }

    return mediaType;
  }

  getFileByPath(filePath) {
    let mediaType = this.getMediaType(filePath);
    var headers = new Headers({ 'Content-Type': mediaType, 'Accept': mediaType });

    let options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.Blob;
    return this.http.post(this.documentsUrl + '/getByPath/', filePath, options)
          .map((res) => {
            return new Blob([res.blob()], { type: mediaType })
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