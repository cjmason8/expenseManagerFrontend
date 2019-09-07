import { Expense } from "../../expenses/shared/expense";
import { Income } from "../../incomes/shared/income";

export class HomeInfo {
    expenses: Expense[] = [];
    unpaidExpenses: Expense[] = [];
    incomes: Income[] = [];
    previousWeek: String;
    nextWeek: String;
    thisWeek: String;
    incomeTotal: String;
    expenseTotal: String;
    unpaidExpenseTotal: String;
    difference: String;
}
