import {RefData} from "../../ref-data/shared/ref-data";
import { Document } from '../../documents/shared/document';

export class Donation {
  id: number;
  cause: RefData;
  amount: number;
  dueDateString: string;
  description: string;
  notes: string;
  documentDto: Document = new Document();
  metaDataChunk: string;

  constructor() {
  }
}
