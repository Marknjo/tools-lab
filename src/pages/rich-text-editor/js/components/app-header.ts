import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';
import { INSERTABLE } from '../core/types/insert-positions';

class AppHeader
  extends Component<HTMLDivElement, HTMLFormElement>
  implements ComponentConfigurables
{
  constructor() {
    super({
      templateId: 'template-header',
      rootElId: 'root',
      insertPosition: INSERTABLE.AFTER_BEGIN,
    });
  }
}

export default AppHeader;
