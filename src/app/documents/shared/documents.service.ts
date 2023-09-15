import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'
import { Document } from "./document";

import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable()
export class DocumentsService {

  private documentsUrl: string = environment.backendEndPoint + "/documents";
  currentFolderPath: string;

  constructor(private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute) { }

  uploadFile(file, type, path?) {
    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    let headers = new HttpHeaders();
    let url = this.documentsUrl + '/upload?type=' + type;
    if (path) {
      url += '&path=' + path;
    }
  
    return this.http.post(url, formData, { headers });
  } 

  getFile(id, type, filePath) {
    let mediaType = this.getMediaType(filePath);
    var headers = new HttpHeaders({ 'Content-Type': mediaType, 'Accept': mediaType });

    return this.http.get(this.documentsUrl + '/get/' + type + '/' + id, { responseType: 'arraybuffer', headers: headers })
          .map((res) => {
            return new Blob([res], { type: mediaType })
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
    var headers = new HttpHeaders({ 'Content-Type': mediaType, 'Accept': mediaType });

    return this.http.get(this.documentsUrl + '/get/' + id, { responseType: 'arraybuffer', headers: headers })
          .map((res) => {
            return new Blob([res], { type: mediaType })
        });
  }   

  getDocuments(folderPath, includeArchived): Observable<Document[]> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<Document[]>(this.documentsUrl + '/list', {"folderPath": folderPath, "includeArchived": includeArchived}, { responseType: 'json', headers: headers });
  }

  createDirectory(directory): Observable<Document> {
    let url = this.documentsUrl + '/directory';
    let headers = new HttpHeaders();

    return this.http.post<Document>(url, directory, { responseType: 'json', headers: headers });
  } 

  updateDirectory(directory): Observable<Document> {
    let url = this.documentsUrl + '/directory';
    let headers = new HttpHeaders();

    return this.http.put<Document>(url, directory, { responseType: 'json', headers: headers });
  }  

  addDocument(document): Observable<Document> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<Document>(this.documentsUrl, JSON.stringify(document), { responseType: 'json', headers: headers });
  }

  moveFiles(moveFilesDto): Observable<Document> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<Document>(this.documentsUrl + '/move', JSON.stringify(moveFilesDto), { responseType: 'json', headers: headers });
  }

  updateDocument(document): Observable<Document> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.put<Document>(this.getDocumentUrl(document.id), JSON.stringify(document), { responseType: 'json', headers: headers });
  }

  deleteDocument(id): Observable<Document> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.delete<Document>(this.getDocumentUrl(id), { responseType: 'json', headers: headers });
  }

  archiveFolder(id): Observable<Document> {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.get<Document>(this.getDocumentUrl(id) + '/archive', { responseType: 'json', headers: headers });
  }

  private getDocumentUrl(id){
    return this.documentsUrl + "/" + id;
  }

}