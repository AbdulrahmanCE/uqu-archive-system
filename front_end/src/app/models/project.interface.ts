import { IOffer } from './offer.interface';
import { IAuthority } from './authority.interface';

export interface IProject {
  id?: number;
  title?: string;
  description?: string;
  progress?: number;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
  authority?: IAuthority;
  status?: string;
  category?: string;
  skills?: string[];
  offers_num?: number;
  offers?: IOffer[];
}
