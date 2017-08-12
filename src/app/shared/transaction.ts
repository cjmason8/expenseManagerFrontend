import {RefData} from "../ref-data/shared/ref-data";

export class Transaction {
  id: number;
  treansactionType: RefData;
  amount: number;
  dueDateString: string;
  recurringType: RefData;
  startDateString: string;
  endDateString: string;
  notes: string;

  constructor() {
  }
}
