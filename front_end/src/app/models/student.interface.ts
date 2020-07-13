import { IOffer } from './offer.interface';
import { IAccount } from './account.interface';

export interface IStudent {
  id?: number;
  studentId?: number;
  name?: string;
  brief?: string;
  major?: string;
  offers?: IOffer[];
  skills?: string[];
  account?: IAccount;
  first_name?: string;
  last_name?: string;
}
