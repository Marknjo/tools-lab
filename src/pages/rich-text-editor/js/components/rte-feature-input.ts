import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';
import { INSERTABLE } from '../core/types/insert-positions';
import { FeatureButtonConfigs } from '../types/editor-types';

export class FeatureInput
  extends Component<HTMLDivElement, HTMLDivElement>
  implements ComponentConfigurables
{
  constructor(private configs: FeatureButtonConfigs) {
    super({
      rootElId: configs.rootId,
      htmlElId: `feat-${configs.id}`,
      templateId: 'template-input',
      insertPosition: INSERTABLE.BEFORE_END,
    });

    /// Handle root element conf
    this.renderConfigs();
  }

  renderConfigs() {
    /// Don't show invisible btn
    if (!this.configs.isEnabled) return;

    const inputEl = this.htmlEl.firstElementChild as HTMLInputElement;
    const inputLabel = this.htmlEl
      .lastElementChild as HTMLLabelElement;

    /// configure input
    const inputOptions = this.configs.inputOption;
    if (inputOptions) {
      for (let [key, value] of Object.entries(inputOptions)) {
        if (key !== this.configs.inputOption?.labelId) {
          inputEl.setAttribute(key, `${value}`);
        }
      }
    }

    // configure label
    if (inputLabel) {
      this.configs.inputOption?.labelId &&
        inputLabel.setAttribute(
          'for',
          this.configs.inputOption.labelId
        );

      inputLabel.textContent = this.configs.title;
    }
  }
}
