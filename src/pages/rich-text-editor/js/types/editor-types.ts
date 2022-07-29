export enum FeatureType {
  BUTTON = 'button',
  SELECT = 'select',
  INPUT_COLOR = 'color',
  INPUT_CHECKBOX = 'checkbox',
  EDITOR = 'editor',
}

export interface FeatureButtonConfigs {
  id: string;
  title: string;
  rootId: string;
  isEnabled: boolean;
  type: FeatureType;
  iconType?: string;
  selectOptions?: Array<string>;
  customSelectors?: string;
  inputOption?: { [key: string]: string | boolean | number };
}

export type ButtonsCollection = Array<FeatureButtonConfigs>;
