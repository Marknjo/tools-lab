/**
 * Helps to mark or identify editor elements
 * Mostly, block types
 **/
export enum EditorElTypes {
  PARA = 'para',
  BLOCK = 'block',
  BASE = 'base', // the base element of the editor container
}

export enum FeatureType {
  BUTTON = 'button',
  SELECT = 'select',
  INPUT = 'input',
  EDITOR = 'editor',
}

export enum EditorSupportedFeatures {
  BOLD = 'bold',
  ITALICIZE = 'italic',
  UNDERLINE = 'underline',
  STRIKETHROUGH = 'strikethrough',
  SUPERSCRIPT = 'superscript',
  SUBSCRIPT = 'subscript',
  OL_LIST = 'ol-list',
  UL_LIST = 'ul-list',
  UNDO = 'undo',
  REDO = 'redo',
  INSERT_LINK = 'insert-link',
  BREAK_LINK = 'break-link',
  ALIGN_LEFT = 'align-left',
  ALIGN_RIGHT = 'align-right',
  ALIGN_CENTER = 'align-center',
  ALIGN_JUSTIFY = 'align-justify',
  INDENT = 'indent',
  OUTDENT = 'outdent',
  SWAP_TAG = 'swap-tag',
  HEADINGS = 'headings',
  FONT_FAMILY = 'font-family',
  FONT_SIZE = 'font-size',
  FONT_COLOR = 'font-color',
  FONT_BACKGROUND_COLOR = 'font-background-color',
  EDITOR_AREA = 'editor-area',
}

export interface FeatureButtonConfigs {
  id: EditorSupportedFeatures;
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
