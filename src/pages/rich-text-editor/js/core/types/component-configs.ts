import { INSERTABLE } from './insert-positions';

export interface ComponentConfigs {
  templateId: string;
  rootElId: string;
  htmlElId?: string; // Element
  insertPosition?: INSERTABLE;
}
