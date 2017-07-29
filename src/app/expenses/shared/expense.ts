export class Expense {
  id: number;
  expenseType: string;
  amount: number;
  dueDateString: string;
  paid: boolean;
  recurringType: string;
  startDateString: string;
  endDateString: string;
  notes: string;

  constructor() {
  }
}
