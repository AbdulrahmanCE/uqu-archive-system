import { IFormLabel } from './form-label.interface';

export interface IForm {
    title?: string;
    images?: File[];
    labeledImage?: File;
    labels?: IFormLabel[];
}