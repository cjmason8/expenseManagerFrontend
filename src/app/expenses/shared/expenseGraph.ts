import { Expense } from './expense'
import { Document } from '../../documents/shared/document'

export class ExpenseGraph {
    expenses: Expense[];
    documents: Document[];
    expenseGraphDto: any;
}
