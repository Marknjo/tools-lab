import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';

class InsertLink
  extends Component<HTMLDivElement, HTMLFormElement>
  implements ComponentConfigurables
{
  constructor() {
    super({
      htmlElId: 'link-inserter-form',
      rootElId: 'insert-url',
      templateId: 'template-add-url',
    });
  }
}

export default InsertLink;
