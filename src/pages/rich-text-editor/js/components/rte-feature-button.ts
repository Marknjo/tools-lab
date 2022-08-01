import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';
import { INSERTABLE } from '../core/types/insert-positions';
import { FeatureButtonConfigs } from '../types/editor-types';

export class FeatureButton
  extends Component<HTMLDivElement, HTMLButtonElement>
  implements ComponentConfigurables
{
  constructor(private configs: FeatureButtonConfigs) {
    super({
      rootElId: configs.rootId,
      htmlElId: configs.id,
      templateId: 'template-feature-btn',
      insertPosition: INSERTABLE.BEFORE_END,
    });

    /// Handle root element conf
    this.renderConfigs();
  }

  renderConfigs() {
    /// Don't show invisible btn
    if (!this.configs.isEnabled) return;

    const btnEl = this.htmlEl;

    /// Add title to the btn element
    btnEl.setAttribute('title', this.configs.title);

    const icon = btnEl.firstElementChild;
    // Configure icon type
    if (icon && this.configs.iconType) {
      icon.classList.add(`fa-${this.configs.iconType}`);
    }
  }
}
