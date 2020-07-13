import { IProject } from './project.interface';
import { IStudent } from './student.interface';
import { IAuthority } from './authority.interface';
import { IRate } from './rate.interface';

export interface IOffer {
  id?: number;
  offer_id?: number;
  project?: IProject;
  project_id?: number;
  students?: IStudent;
  description?: string;
  status?: string;
  rate?: IRate[];
  datetime?: string;
}
