import { Injectable } from '@angular/core';
import { Headers, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'

import { HttpInterceptor } from "../../shared/http.interceptor"

@Injectable()
export class DocumentsService {

  private documentsUrl: string = environment.backendEndPoint + "/documents";
  currentFolderPath: string;

  constructor(private http: HttpInterceptor,
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

  getFileById(id, fileName) {
    let mediaType = this.getMediaType(fileName);
    var headers = new Headers({ 'Content-Type': mediaType, 'Accept': mediaType });

    let options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.Blob;
    return this.http.get(this.documentsUrl + '/get/' + id, options)
          .map((res) => {
            return new Blob([res.blob()], { type: mediaType })
        });
  }   

  getDocuments(folderPath){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.documentsUrl + '/list', folderPath, options)
      .map(res => res.json());
  }

  createDirectory(directory, options) {
    let url = this.documentsUrl + '/directory';

    return this.http.post(url, directory, options)
          .map(res => res.json());
  } 

  updateDirectory(directory, options) {
    let url = this.documentsUrl + '/directory';

    return this.http.put(url, directory, options)
          .map(res => res.json());
  }  

  addDocument(document){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.documentsUrl, JSON.stringify(document), options)
      .map(res => res.json());
  }

  moveFiles(moveFilesDto){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.post(this.documentsUrl + '/move', JSON.stringify(moveFilesDto), options)
      .map(res => res.json());
  }

  updateDocument(document){
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.put(this.getDocumentUrl(document.id), JSON.stringify(document), options)
      .map(res => res.json());
  }

  deleteDocument(id) {
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var options = new RequestOptions({ headers: headers });
    return this.http.delete(this.getDocumentUrl(id), options)
      .map(res => res.json());    
  }

  private getDocumentUrl(id){
    return this.documentsUrl + "/" + id;
  }

}