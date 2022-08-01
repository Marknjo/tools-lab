import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';
import { INSERTABLE } from '../core/types/insert-positions';
import { FeatureButtonConfigs } from '../types/editor-types';

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
      htmlElId: configs.id,
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

    /// configure input
    const options = this.configs.selectOptions;
    if (options && options.length > 0) {
      this.configureSelectOptions(selectEl);
    }

    // get options configs
    switch (this.configs.id) {
      case 'feat-font-types':
        this.configs.selectOptions ||
          this.configureSelectOptions(
            selectEl,
            this.defaultFontTypes
          );
        break;

      case 'feat-font-sizes':
        this.configs.selectOptions ||
          this.configureSelectOptions(
            selectEl,
            this.defaultFontSizes
          );
        break;
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

    options.forEach(option => {
      const optionEl = document.createElement('option');

      optionEl.setAttribute('value', option);

      optionEl.textContent = `${option}`.toUpperCase();

      // return optionEl;
      selectEl.insertAdjacentElement(INSERTABLE.BEFORE_END, optionEl);
    });

    // console.log(selectOptions);

    // selectEl.innerHTML = selectOptions.join('');
  }
}
