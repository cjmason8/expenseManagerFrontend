import {RefData} from "../../ref-data/shared/ref-data";

export class Donation {
  id: number;
  cause: RefData;
  amount: number;
  dueDateString: string;
  notes: string;
  documentationFilePath: string;
  metaDataChunk: string;

  constructor() {
  }
}
