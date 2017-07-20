export class Expense {
  id: number;
  expenseType: string;
  amount: number;
  dueDateString: string;
  paid: boolean;
  recurringTypeId: string;
  startDateString: string;
  endDateString: string;
  notes: string;

  constructor() {
  }
}
