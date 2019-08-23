import { Document } from '../../documents/shared/document';

export class RentalPayment {
  id: number;
  totalRent: number;
  adminFee: number;
  managementFee: number;
  otherFee: number;
  statementFromString: string;
  statementToString: string;
  property: string;
  documentDto: Document = new Document();

  constructor() {
  }
}
