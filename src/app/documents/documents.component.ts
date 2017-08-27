import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "./shared/documents.service";
import { AuthenticateService } from '../shared/authenticate.service';
import { AuthenticateComponent } from '../shared/authenticate.component';
import { Document } from "./shared/document";
import {CookieService} from 'angular2-cookie/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-donations',
 templateUrl: './donations.component.html',
 styleUrls: ['./donations.component.css'],
 providers: []
})
export class DocumentsComponent extends AuthenticateComponent {
  private documents: Document[] = [];

  constructor(authenticateService: AuthenticateService, private documentsService: DocumentsService,
  private route: ActivatedRoute, _cookieService:CookieService) { 
      super(authenticateService, _cookieService);
  }

 ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(params => {
      this.documentsService.getDocuments()
        .subscribe(data => {
          this.documents = data;
        });
    });
 }

}