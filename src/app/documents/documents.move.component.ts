import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {DocumentsService} from "./shared/documents.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { FileComponent } from '../shared/file.component';
import { DocumentMove } from "./shared/document.move";
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Headers, RequestOptions} from '@angular/http';

@Component({
 selector: 'app-donations',
 templateUrl: './documents.move.component.html',
 styleUrls: ['./documents.component.css'],
 providers: []
})
export class DocumentsMoveComponent extends FileComponent {
  public documentMove: DocumentMove = new DocumentMove();
  public documents: Document[] = [];
  directoryForm: FormGroup;
  fileForm: FormGroup;
  directory: Document = new Document();

  @ViewChild("fileElement",{static:false})
  fileInput: any;

  constructor(formBuilder: FormBuilder,
  authenticateService: AuthenticateService, public documentsService: DocumentsService,
  private route: ActivatedRoute, router: Router, _cookieService:CookieService) { 
      super(authenticateService, _cookieService, documentsService, router);
      this.fileType = 'documents';
      this.directoryForm = formBuilder.group({
        directory: ['', []]
      });
      this.fileForm = formBuilder.group({
        metaDataChunk: ['', []],
        fileName: ['', []]
      });      
  }

 ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      this.documentsService.getDocuments(this.documentsService.currentFolderPath)
        .subscribe(data => {
          this.documents = data;
        });
    });
 }

 getDirectory() {
  return !this.documentsService.currentFolderPath || this.documentsService.currentFolderPath === '/docs/expenseManager/filofax'?"/"
          :this.documentsService.currentFolderPath.replace('/docs/expenseManager/filofax/', '/');
 }

 addFileId(id) {
  this.documentMove.fileIds.push(id);
 }

 removeFileId(id) {
  var index = this.documentMove.fileIds.indexOf(id);
  if (index > -1) {
    this.documentMove.fileIds.splice(index, 1);
  }
 }

 readyToMove(id) {
   return this.documentMove.fileIds.indexOf(id) > -1;
 }

 moveFiles() {
  var result = this.documentsService.moveFiles(this.documentMove);

  result.subscribe(data => {
    this.documentsService.currentFolderPath = data.filePath;
    this.router.navigate(['documents/all'], {queryParams: {existingFolder: true}});
  });    
}
}