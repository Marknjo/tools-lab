import Component from '../core/base-component';

class Editor extends Component<HTMLDivElement, HTMLFormElement> {
  constructor() {
    super({
      rootElId: 'root',
      templateId: 'template-rich-editor',
    });
  }

  config(): void {}

  sideEffects(): void {}
}

export default Editor;
