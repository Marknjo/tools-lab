import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';
import { editorFeatures } from '../data/editor-features';
import {
  EditorSupportedFeatures,
  FeatureType,
} from '../types/editor-types';
import { FeatureButton } from './rte-feature-button';
import { FeatureInput } from './rte-feature-input';
import { FeatureSelectInput } from './rte-feature-select-input';
import { FeatureEditorArea } from './rte-features-editor-area';

enum FormatHTMLTagActions {
  BOLD = 'strong',
  ITALIC = 'em',
  UNDERLINE = 'u',
  STRIKETHROUGH = 'strike',
  SUPERSCRIPT = 'sup',
  SUBSCRIPT = 'sub',
  OL_LIST = 'ol',
  UL_LIST = 'ul',
  ANCHOR = 'a',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  PARAGRAPH = 'p',
  SECTION = 'section',
  DIV = 'div',
  ARTICLE = 'article',
  ASIDE = 'aside',
}

class Editor
  extends Component<HTMLDivElement, HTMLFormElement>
  implements ComponentConfigurables
{
  editorAreaEl: HTMLElement | undefined;
  range: Range | undefined;
  selection: Selection | undefined;

  constructor() {
    super({
      rootElId: 'root',
      templateId: 'template-rich-editor',
    });

    /// Render editor
    this.renderConfigs();

    /// Handle effects
    this.effectsConfigs();
  }

  /**
   * Configure render options configurations
   */
  renderConfigs() {
    /// Show editor buttons
    this.renderButtons();
    this.renderInputEls();
    this.renderSelectEls();

    /// Show Editor area
    this.renderEditorArea();
  }

  effectsConfigs() {
    // What is the current clicked button
    // Get the selected menu container
    // get it's description
    // change the text, if it is selected
    // You have to select the text to implement the menu action, except for the font family button
    // this.textSelectorHandler();
    this.formatActionsHandler();
  }

  /// PRIVATE METHODS
  private formatActionsHandler() {
    if (this.actionsMenuEl) {
      this.actionsMenuEl.addEventListener('click', event => {
        // handle click events here to change editor section
        // Get the target element
        // Element must be either a button or an italicize html element
        // Get the action name -> If Button, get from button id, if italic, reach out to the button as pare only parent element and grab it's id;
        // Format selected text in the UI

        const clickedEl = event.target as HTMLElement;

        let targetAction: string = '';

        if (clickedEl.tagName === 'I') {
          const btnId = clickedEl.parentElement!.id;
          targetAction = btnId.split('-').slice(1).join('-');
        }

        if (clickedEl.tagName === 'BUTTON') {
          const btnId = clickedEl.id;
          targetAction = btnId.split('-').slice(1).join('-');
        }

        if (targetAction) {
          /// handle text formatting
          switch (targetAction) {
            case EditorSupportedFeatures.BOLD:
              console.log(targetAction);

              break;
          }
        }

        event.stopImmediatePropagation();
      });
    }
  }

  /**
   * A shortcut for creating an element depending with the feature action
   *
   * Targets actions like Bold, Italic, underline, strike, subscript, superscript, list and anchor
   *
   * @param elementName String of element name
   * @returns a crated html element
   */
  private el<H extends HTMLElement>(
    elementName: FormatHTMLTagActions
  ): H {
    return document.createElement(elementName) as H;
  }

  /**
   * Get the editor section
   */
  private get actionsMenuEl() {
    return this.htmlEl.firstElementChild;
  }

  /**
   * Get the editor features of a given type
   * @param featureType
   * @returns a collection of Editor features ButtonsCollection configuration
   */
  filterFeaturesByType(featureType: FeatureType) {
    const filterResults = editorFeatures.filter(
      feat => feat.type === featureType
    );

    return filterResults;
  }

  /**
   * Handles instantiation of the class handling displaying of the editor area
   */
  private renderEditorArea() {
    const editorArea = new FeatureEditorArea();
    this.editorAreaEl = editorArea.editorEl;
  }

  /**
   * Handles button rendering to the UI
   */
  private renderButtons() {
    const getFeatures = this.filterFeaturesByType(FeatureType.BUTTON);

    getFeatures.forEach(btnAction => {
      new FeatureButton(btnAction);
    });
  }

  /**
   * Handlers display of form input control actions to the ui
   */
  private renderInputEls() {
    const configs = this.filterFeaturesByType(FeatureType.INPUT);

    configs.forEach(config => {
      new FeatureInput(config);
    });
  }

  /**
   * Handlers display of form select control actions to the ui
   */
  private renderSelectEls() {
    const configs = this.filterFeaturesByType(FeatureType.SELECT);

    configs.forEach(config => {
      new FeatureSelectInput(config);
    });
  }

  /**
   * Handles Rendering of the editor area
   */
}

export default Editor;
