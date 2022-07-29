import Component from '../core/base-component';
import { INSERTABLE } from '../core/types/insert-positions';

class AppHeader extends Component<HTMLDivElement, HTMLFormElement> {
  constructor() {
    super({
      templateId: 'template-header',
      rootElId: 'root',
      insertPosition: INSERTABLE.AFTER_BEGIN,
    });
  }

  config(): void {}

  sideEffects(): void {}
}

export default AppHeader;
