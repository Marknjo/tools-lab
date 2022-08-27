import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';
import { INSERTABLE } from '../core/types/insert-positions';
import {
  EditorSupportedFeatures,
  FeatureButtonConfigs,
} from '../types/editor-types';

export class FeatureSelectInput
  extends Component<HTMLDivElement, HTMLDivElement>
  implements ComponentConfigurables
{
  defaultFontTypes: Array<string> = [
    'Arial',
    'Times Roman',
    'Georgia',
  ];

  defaultFontSizes: Array<string> = [
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
  ];

  constructor(private configs: FeatureButtonConfigs) {
    super({
      rootElId: configs.rootId,
      htmlElId: `${configs.id}-container`,
      templateId: 'template-select',
      insertPosition: INSERTABLE.BEFORE_END,
    });

    /// Handle root element conf
    this.renderConfigs();
  }

  renderConfigs() {
    /// Don't show invisible btn
    if (!this.configs.isEnabled) return;

    const selectEl = this.htmlEl
      .firstElementChild as HTMLSelectElement;

    selectEl.title = this.configs.title;
    selectEl.id = `feat-${this.configs.id}`;

    const selectOptions = this.configs.selectOptions;
    // get options configs
    /// @DEBUG: defaults not implemented correctly
    switch (this.configs.id) {
      case EditorSupportedFeatures.FONT_FAMILY:
        selectOptions ||
          this.configureSelectOptions(
            selectEl,
            this.defaultFontTypes
          );
        break;

      case EditorSupportedFeatures.FONT_SIZE:
        selectOptions ||
          this.configureSelectOptions(
            selectEl,
            this.defaultFontSizes
          );
        break;
    }

    /// configure input
    if (selectOptions && selectOptions.length > 0) {
      this.configureSelectOptions(selectEl);
    }
  }

  /**
   * Configures HTML ELEMENT Configurations
   * @param selectEl A Select element handle
   * @param options Options configurations
   */
  private configureSelectOptions(
    selectEl: HTMLSelectElement,
    options?: Array<string>
  ) {
    options = this.configs.selectOptions
      ? this.configs.selectOptions
      : options
      ? options
      : [];

    if (options.length > 0) {
      /**
       *  Customize different selectoers
       */
      /// Add paragraph select option to the
      /// headings select menu as a default selector
      if (this.configs.id === EditorSupportedFeatures.HEADINGS) {
        this.insetSelectOptions('p', selectEl);
      }

      /**
       * Add default options
       */
      options.forEach(option => {
        this.insetSelectOptions(option, selectEl);
      });
    }

    // console.log(selectOptions);

    // selectEl.innerHTML = selectOptions.join('');
  }

  private insetSelectOptions(option: string, selectEl: HTMLElement) {
    const optionEl = document.createElement('option');

    optionEl.setAttribute('value', option);

    optionEl.textContent = `${option}`.toUpperCase();

    // return optionEl;
    selectEl.insertAdjacentElement(INSERTABLE.BEFORE_END, optionEl);
  }
}
