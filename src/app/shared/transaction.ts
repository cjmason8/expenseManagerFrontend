import {RefData} from "../ref-data/shared/ref-data";

export class Transaction {
  id: number;
  transactionType: RefData;
  amount: number;
  dueDateString: string;
  recurringType: RefData;
  startDateString: string;
  endDateString: string;
  notes: string;
  documentationFilePath: string;
  metaDataChunk: string;

  constructor() {
  }
}
