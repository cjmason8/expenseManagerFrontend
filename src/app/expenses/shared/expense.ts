import { Transaction } from '../../shared/transaction';

export class Expense extends Transaction {
  paid: boolean;
}
