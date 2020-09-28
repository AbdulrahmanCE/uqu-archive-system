import { IFormLabel } from "./form-label.interface";

export interface IForm {
  name?: string;
  img_height?: number;
  img_width?: number;
  labels?: IFormLabel[];
  images?: File[];
  labeledImage?: File;
}
