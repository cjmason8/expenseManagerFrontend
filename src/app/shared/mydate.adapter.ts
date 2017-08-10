import {NativeDateAdapter} from '@angular/material';

export class MyDateAdapter extends NativeDateAdapter {
   parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('-') > -1)) {
       const str = value.split('-');
       if (str.length < 2 || isNaN(+str[0]) || isNaN(+str[1]) || isNaN(+str[2])) {
         return null;
       }
       return new Date(Number(str[2]), Number(str[1]) - 1, Number(str[0]));
     }
     const timestamp = typeof value === 'number' ? value : Date.parse(value);
     return isNaN(timestamp) ? null : new Date(timestamp);
   }
   format(date: Date, displayFormat: Object): string {
       if (displayFormat == "input") {
           let day = date.getDate();
           let month = date.getMonth() + 1;
           let year = date.getFullYear();
           return this._to2digit(day) + '-' + this._to2digit(month) + '-' + year;
       } else {
           return date.toDateString();
       }
   }

   private _to2digit(n: number) {
       return ('00' + n).slice(-2);
   } 
};

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
    },
    display: {
        dateInput: 'input',
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'},
    }
}