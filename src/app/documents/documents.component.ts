import { Component, OnInit, ViewChild } from '@angular/core';
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
  private document: Document = new Document();
  private documents: Document[] = [];
  directoryForm: FormGroup;
  fileForm: FormGroup;
  directory: Document = new Document();
  originalDirectory: string;
  uploading: string;
  directoryAction: string = "Create";

  @ViewChild("fileElement")
  fileInput: any;

  constructor(formBuilder: FormBuilder,
  authenticateService: AuthenticateService, documentsService: DocumentsService,
  private route: ActivatedRoute, router: Router, _cookieService:CookieService) { 
      super(authenticateService, _cookieService, documentsService, router);
      this.fileType = 'documents';
      this.directoryForm = formBuilder.group({
        directory: ['', []],
        directoryMetaDataChunk: ['', []]
      });
      this.fileForm = formBuilder.group({
        metaDataChunk: ['', []],
        fileName: ['', []]
      });      
  }

 ngOnInit() {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      if (params['existingFolder']) {
        this.openFolder(this.documentsService.currentFolderPath);
      }
      else {
        this.documentsService.getDocuments("/docs/expenseManager/filofax")
          .subscribe(data => {
            this.documents = data;
            this.documentsService.currentFolderPath = "/docs/expenseManager/filofax";
          });
      }
    });
 }

  openFolder(folderPath) {
    this.documents = [];
    this.route.params.subscribe(params => {
      this.documentsService.getDocuments(folderPath)
        .subscribe(data => {
          this.documents = data;
          this.documentsService.currentFolderPath = folderPath;
        });
    });
  }

  openParentFolder() {
    this.openFolder(this.documentsService.currentFolderPath.substring(0, this.documentsService.currentFolderPath.lastIndexOf('/')));
  }

  postFileChange(document) {
    this.document = document;
    this.document.originalFileName = this.document.fileName;
  }

  actionDirectory() {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });

    if (this.directoryAction === "Create") {
      this.directory.folderPath = this.documentsService.currentFolderPath;
      this.documentsService.createDirectory(this.directory, options)
        .subscribe(data => {
            this.documentsService.getDocuments(data.filePath)
          .subscribe(data2 => {
            this.documents = data2;
            this.directory = new Document();
            this.documentsService.currentFolderPath = data.filePath;
          });
        });
    } else {
      this.documentsService.updateDirectory(this.directory, options)
        .subscribe(data => {
            this.documentsService.getDocuments(data.filePath)
          .subscribe(data2 => {
            this.documents = data2;
            this.directory = new Document();
            this.documentsService.currentFolderPath = data.filePath;
            this.directoryAction = "Create";
          });
        });      
    }
  }

  getDirectory() {
    return !this.documentsService.currentFolderPath || this.documentsService.currentFolderPath === '/docs/expenseManager/filofax'?"/"
            :this.documentsService.currentFolderPath.replace('/docs/expenseManager/filofax/', '/');
  }

  saveFile() {
    var result;

    if (this.document.id){
      result = this.documentsService.updateDocument(this.document);
    } else {
      result = this.documentsService.addDocument(this.document);
    }

    result.subscribe(data => {
      this.documentsService.getDocuments(data.filePath)
        .subscribe(data => {
          this.documents = data;
          this.document = new Document();
          this.fileInput.nativeElement.value = "";
        });
    });    
  }

  editDocument(document) {
    if (document.isFolder) {
      this.directory.id = document.id;
      this.directory.fileName = document.fileName;
      this.directory.originalFileName = document.fileName;
      this.directory.isFolder = document.isFolder;
      this.directory.folderPath = document.folderPath;
      this.directory.metaDataChunk = document.metaDataChunk;
      this.directoryAction = "Update";
    }
    else {
      this.document.id = document.id;
      this.document.fileName = document.fileName;
      this.document.originalFileName = document.fileName;
      this.document.isFolder = document.isFolder;
      this.document.folderPath = document.folderPath;
      this.document.metaDataChunk = document.metaDataChunk;
    }
  }

    deleteDocument(document){
      let msg = "Are you sure you want to delete";
      if (document.isFolder) {
        msg += " the folder " + document.fileName + "? This will also delete any files or subfolders with in this folder.";
      }
      else {
        msg += " the file "  + document.fileName + "?";
      }
      if (confirm(msg)) {
        this.documentsService.deleteDocument(document.id)
          .subscribe(data => {
              this.documentsService.getDocuments(data.filePath)
                .subscribe(data2 => {
                  this.documents = data2;
                  this.directory = new Document();
                  this.documentsService.currentFolderPath = data.filePath;
              });
            });
      }
  }

  move() {
    this.router.navigate(['documents/move']);
  }

}