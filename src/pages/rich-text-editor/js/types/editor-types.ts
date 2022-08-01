export enum FeatureType {
  BUTTON = 'button',
  SELECT = 'select',
  INPUT = 'input',
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
  inputOption?: InputOptions;
}

export interface InputOptions extends Partial<HTMLInputElement> {
  labelId?: string;
}

export type ButtonsCollection = Array<FeatureButtonConfigs>;
