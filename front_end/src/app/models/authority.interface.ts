import { IProject } from './project.interface';
import { IAccount } from './account.interface';

export interface IAuthority {
  id?: number;
  name?: string;
  projects?: IProject[];
  account?: IAccount;
  user_id?: number;
}
