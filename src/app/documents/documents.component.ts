import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {DocumentsService} from "./shared/documents.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { AuthenticateComponent } from '../shared/authenticate.component';
import { Document } from "./shared/document";
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Headers, RequestOptions} from '@angular/http';

@Component({
 selector: 'app-donations',
 templateUrl: './documents.component.html',
 styleUrls: ['./documents.component.css'],
 providers: []
})
export class DocumentsComponent extends AuthenticateComponent {
  private documents: Document[] = [];
  currentFolderPath: string;
  form: FormGroup;
  directory: string;
  uploading: string;

  constructor(formBuilder: FormBuilder,
  authenticateService: AuthenticateService, private documentsService: DocumentsService,
  private route: ActivatedRoute, _cookieService:CookieService) { 
      super(authenticateService, _cookieService);

      this.form = formBuilder.group({
        directory: ['', []]
      });
  }

 ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      this.documentsService.getDocuments("root")
        .subscribe(data => {
          this.documents = data;
          this.currentFolderPath = "root";
        });
    });
 }

 viewDocumentation(filePath) {
    this.documentsService.getFileByPath(filePath)
      .subscribe((res) => {
        var fileURL = URL.createObjectURL(res);
        window.open(fileURL);
      });
  }

  openFolder(folderPath) {
    this.documents = [];
    this.route.params.subscribe(params => {
      this.documentsService.getDocuments(folderPath)
        .subscribe(data => {
          this.documents = data;
          this.currentFolderPath = folderPath;
        });
    });
  }

  openParentFolder() {
    this.openFolder(this.currentFolderPath.substring(0, this.currentFolderPath.lastIndexOf('/')));
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();
      let options = new RequestOptions({ headers: headers });
      this.uploading = "UPLOADING...";
      this.documentsService.uploadFile(formData, options, 'documents', this.currentFolderPath)
        .subscribe(data => {
            this.uploading = "";
            this.documentsService.getDocuments(this.currentFolderPath)
          .subscribe(data => {
            this.documents = data;
          });
        });
    }
  }

  createDirectory() {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let directoryPath = this.currentFolderPath + '/' + this.directory;
    this.documentsService.createDirectory(directoryPath, options)
      .subscribe(data => {
          this.documentsService.getDocuments(directoryPath)
        .subscribe(data => {
          this.documents = data;
          this.directory = "";
          this.currentFolderPath = directoryPath;
        });
      });
  }  

}