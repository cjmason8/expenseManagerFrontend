import { RentalPayment } from './rentalpayment';

export class RentalPaymentInfo {
  rentalPayments: RentalPayment[] = [];
  previousYear: number;
  nextYear: number;

  constructor() {
  }
}
