import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { RefData } from '../shared/ref-data';
import { RefDatasService } from '../shared/ref-datas.service';
import { AuthenticateService } from '../../shared/authenticate.service';
import { BasicValidators } from '../../shared/basic-validators';

import {MdSelectChange} from '@angular/material';

@Component({
  selector: 'app-ref-data-form',
  templateUrl: './ref-data-form.component.html',
  styleUrls: ['./ref-data-form.component.css'],
  providers: [CookieService]
})
export class RefDataFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  refData: RefData = new RefData();

  drinksRequired = false;
  pokemonRequired = false;
  drinksDisabled = false;
  pokemonDisabled = false;
  showSelect = false;
  currentDrink: string;
  currentPokemon: string[];
  currentPokemonFromGroup: string;
  currentDigimon: string;
  latestChangeEvent: MdSelectChange;
  floatPlaceholder: string = 'auto';
  foodControl = new FormControl('pizza-1');
  topHeightCtrl = new FormControl(0);
  drinksTheme = 'primary';
  pokemonTheme = 'primary';

  types = [
      {value: 'EXPENSE_TYPE', viewValue: 'Expense Type'},
      {value: 'INCOME_TYPE', viewValue: 'Income Type'},
      {value: 'RECURRING_TYPE', viewValue: 'Recurring Type'}
  ];

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private refDatasService: RefDatasService,
    private authenticateService: AuthenticateService,
    private _cookieService:CookieService
  ) {
    this.form = formBuilder.group({
      type: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]]
    });

  }

  ngOnInit() {
    this.authenticateService.authenticate(this._cookieService.get('token'));

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit Ref Data' : 'New Ref Data';

      if (!id)
        return;

      this.refDatasService.getRefData(id)
        .subscribe(
          refData => this.refData = refData,
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    });
  }

  save() {
    var result;

    if (this.refData.id){
      result = this.refDatasService.updateRefData(this.refData);
    } else {
      result = this.refDatasService.addRefData(this.refData);
    }

    result.subscribe(data => {
      this.router.navigate(['refdatas/all']);
    });
  }
}
