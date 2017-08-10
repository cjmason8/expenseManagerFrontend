import { ValidatorFn, AbstractControl } from '@angular/forms';

export function customValidator(element: any): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const forbidden = element && !element.transactionType;
    console.log('YO! - (' + forbidden + ')');
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}