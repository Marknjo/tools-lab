import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';
import { INSERTABLE } from '../core/types/insert-positions';

export class FeatureEditorArea
  extends Component<HTMLElement, HTMLElement>
  implements ComponentConfigurables
{
  constructor() {
    super({
      rootElId: 'feat-sec-editor-area',
      htmlElId: 'feat-editor',
      templateId: 'template-editor-area',
      insertPosition: INSERTABLE.AFTER_BEGIN,
    });
  }

  renderConfigs() {
    // @TODO:
    // 1. Put cursor position in the position 0 of the Write an awesome article
  }
}
