import Component from '../core/base-component';
enum FeatureType {
  BUTTON = 'button',
  SELECT = 'select',
  INPUT_COLOR = 'color',
  INPUT_CHECKBOX = 'checkbox',
  EDITOR = 'editor',
}

const editorFeatures: ButtonsCollection = [
  {
    rootId: 'feat-sec-biu',
    id: 'feat-bold',
    iconType: 'bold',
    title: 'Text Bold',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-biu',
    id: 'feat-italic',
    iconType: 'italic',
    title: 'Italicize Text',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-biu',
    id: 'feat-italic',
    iconType: 'underline',
    title: 'Underline Text',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-sss',
    id: 'feat-strikethrough',
    iconType: 'strikethrough',
    title: 'Strikethrough',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-sss',
    id: 'feat-superscript',
    iconType: 'superscript',
    title: 'Superscript',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-sss',
    id: 'feat-subscript',
    iconType: 'subscript',
    title: 'Subscript',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-uo',
    id: 'feat-ol-list',
    iconType: 'list-ol',
    title: 'Ordered List',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-uo',
    id: 'feat-ul-list',
    iconType: 'list-ul',
    title: 'Unordered List',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-ur',
    id: 'feat-undo',
    iconType: 'rotate-left',
    title: 'Undo changes',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-ur',
    id: 'feat-redo',
    iconType: 'rotate-right',
    title: 'Redo changes',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'insert-url',
    id: 'feat-insert-link',
    iconType: 'link',
    title: 'Add Link',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'break-url',
    id: 'feat-break-link',
    iconType: 'link-slash',
    title: 'Break Link',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-align',
    id: 'feat-align-left',
    iconType: 'align-left',
    title: 'Text Align Left',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-align',
    id: 'feat-align-center',
    iconType: 'align-center',
    title: 'Text Align Center',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-align',
    id: 'feat-align-right',
    iconType: 'align-right',
    title: 'Text Align Right',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-align',
    id: 'feat-justify',
    iconType: 'align-justify',
    title: 'Text Align Justify',
    isEnabled: true,
    type: FeatureType.BUTTON,
  },
  {
    rootId: 'feat-sec-hf',
    id: 'feat-headings',
    title: 'Select Heading Type',
    isEnabled: true,
    type: FeatureType.SELECT,
    selectOptions: ['h1', 'h2', 'h3', 'h4', 'h6'],
  },
  {
    rootId: 'feat-sec-hf',
    id: 'feat-font-types',
    title: 'Change Font',
    isEnabled: true,
    type: FeatureType.SELECT,
    selectOptions: ['Arial', 'Georgia'],
  },
  {
    rootId: 'feat-sec-hf',
    id: 'feat-font-sizes',
    title: 'Select Fontsize',
    isEnabled: true,
    type: FeatureType.SELECT,
    selectOptions: [
      '8',
      '10',
      '12',
      '16',
      '18',
      '20',
      '24',
      '28',
      '32',
      '36',
      '40',
      '44',
    ],
  },
  {
    rootId: 'feat-sec-colors',
    id: 'feat-text-color',
    title: 'Font Color',
    isEnabled: true,
    type: FeatureType.INPUT_COLOR,
  },
  {
    rootId: 'feat-sec-colors',
    id: 'feat-bg-color',
    title: 'Highlight Color',
    isEnabled: true,
    type: FeatureType.INPUT_COLOR,
  },
  {
    rootId: 'feat-sec-editor',
    id: 'feat-editor',
    title: 'Editor',
    isEnabled: true,
    type: FeatureType.EDITOR,
  },
];

interface FeatureButtonConfigs {
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

type ButtonsCollection = Array<FeatureButtonConfigs>;

class Editor extends Component<HTMLDivElement, HTMLFormElement> {
  constructor() {
    super({
      htmlElId: 'link-inserter-form',
      rootElId: 'insert-url',
      templateId: 'template-add-url',
    });
  }

  config(): void {}

  sideEffects(): void {}
}

export default Editor;
