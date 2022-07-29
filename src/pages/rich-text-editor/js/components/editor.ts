import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';

class Editor
  extends Component<HTMLDivElement, HTMLFormElement>
  implements ComponentConfigurables
{
  constructor() {
    super({
      rootElId: 'root',
      templateId: 'template-rich-editor',
    });
  }
}

export default Editor;
