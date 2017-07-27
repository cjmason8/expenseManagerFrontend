import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

import { Income } from '../shared/income';
import { RefData } from '../../ref-data/shared/ref-data';
import { IncomesService } from '../shared/incomes.service';
import { AuthenticateService } from '../../shared/authenticate.service';
import { RefDatasService } from '../../ref-data/shared/ref-datas.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-expense-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'],
  providers: [CookieService]
})
export class IncomeFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  income: Income = new Income();
  incomeTypes: Array<RefData>;
  recurringTypes: Array<RefData>;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private incomesService: IncomesService,
    private authenticateService: AuthenticateService,
    private refDatasService: RefDatasService,
    private _cookieService:CookieService
  ) {
    this.form = formBuilder.group({
      incomeType: ['', [
        Validators.required
      ]],
      amount: ['', [
        Validators.required,
        Validators.pattern('[0-9]+(\.[0-9][0-9])?')
      ]],
      dueDateString: ['', []],
      recurring: ['', []],      
      recurringTypeId: ['', []],
      startDateString: ['', []],
      endDateString: ['', []],
      notes: ['', []]
    });
  }

  validateForm() {
    return !this.form.valid || (!this.form.controls['dueDateString'].value && !this.form.controls['recurring'].value);
  }

  ngOnInit() {
    this.authenticateService.authenticate(this._cookieService.get('token'));

    this.refDatasService.getTypes('incomeType')
       .subscribe(data => this.incomeTypes = data);

    this.refDatasService.getTypes('recurringType')
       .subscribe(data => this.recurringTypes = data);

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit Income' : 'New Income';

      if (!id)
        return;

      this.incomesService.getIncome(id)
        .subscribe(
          income => {
            this.income = income;
            if (this.income.recurringTypeId) {
              document.forms[0]['recurring'].checked = true;
              document.getElementById('recurringTable').style.display = 'block';
            }
          },
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    });
  }

  save() {
    var result;

    if (this.income.id){
      result = this.incomesService.updateIncome(this.income);
    } else {
      result = this.incomesService.addIncome(this.income);
    }

    result.subscribe(data => {
      this.router.navigate(['' + data.week]);
    });
  }

  showHideRecurring() {
    if (document.forms[0]['recurring'].checked) {
      document.getElementById('recurringTable').style.display = 'block';
      document.getElementById('dueDateDiv').style.display = 'none';
    }
    else {
      document.getElementById('recurringTable').style.display = 'none';
      document.getElementById('dueDateDiv').style.display = 'block';
    }
  }
}
