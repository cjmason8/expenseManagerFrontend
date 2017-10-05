import {RefData} from "../ref-data/shared/ref-data";
import {Document} from "../documents/shared/document";

export class Transaction {
  id: number;
  transactionType: RefData;
  amount: number;
  dueDateString: string;
  recurringType: RefData;
  startDateString: string;
  endDateString: string;
  notes: string;
  documentDto: Document = new Document();
  metaDataChunk: string;

  constructor() {
  }
}
