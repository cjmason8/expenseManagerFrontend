import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {DocumentsService} from "./shared/documents.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { FileComponent } from '../shared/file.component';
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
export class DocumentsComponent extends FileComponent {
  private documents: Document[] = [];
  currentFolderPath: string;
  form: FormGroup;
  directory: string;
  uploading: string;

  constructor(formBuilder: FormBuilder,
  authenticateService: AuthenticateService, documentsService: DocumentsService,
  private route: ActivatedRoute, router: Router, _cookieService:CookieService) { 
      super(authenticateService, _cookieService, documentsService, router);
      this.fileType = 'documents';
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

  postFileChange(filePath) {
    this.documentsService.getDocuments(this.currentFolderPath)
        .subscribe(data => {
          this.documents = data;
        });
  }

  createDirectory() {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let directoryPath = this.currentFolderPath + '/' + this.directory;
    this.documentsService.createDirectory(directoryPath, options)
      .subscribe(data => {
          this.documentsService.getDocuments(data.filePath)
        .subscribe(data => {
          this.documents = data;
          this.directory = "";
          this.currentFolderPath = directoryPath;
        });
      });
  }  

  getDirectory() {
    return !this.currentFolderPath || this.currentFolderPath === 'root' 
      || this.currentFolderPath === '/docs/expenseManager/filofax'?"/":this.currentFolderPath.replace('/docs/expenseManager/filofax/', '/').replace('root','');
  }

}