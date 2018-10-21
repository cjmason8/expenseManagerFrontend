import {Expense} from "../../expenses/shared/expense"

export class Notification {
  id: number;
  expense: Expense;
  message: string;
  createdDateString: string;
  read: boolean;

  constructor() {
  }
}
