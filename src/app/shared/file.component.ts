import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../shared/authenticate.service';
import { AuthenticateComponent } from '../shared/authenticate.component';
import { DocumentsService } from '../documents/shared/documents.service';


@Component({
  selector: 'file',
  template: '',
  providers: []
})
export class FileComponent extends AuthenticateComponent {
  uploading: string = '';
  fileType: string;

  constructor(
    authenticateService:AuthenticateService,
    _cookieService:CookieService,
    protected documentsService: DocumentsService,
    protected router: Router
  ) {
    super(authenticateService, _cookieService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  fileChange(event, path?) {
    this.uploading = "UPLOADING...";
    this.documentsService.uploadFile(event.target.files[0], this.fileType, path)
      .subscribe(
        filePath => {
          this.uploading = '';
          this.postFileChange(filePath.filePath);
        },
        response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
        });
  }

  viewDocumentation(filePath) {
    this.documentsService.getFileByPath(filePath)
      .subscribe((res) => {
        var fileURL = URL.createObjectURL(res);
        window.open(fileURL);
      });
  }

  goto(destination) {
    this.router.navigate([destination]);
  }

  postFileChange(filePath) {
  }

}