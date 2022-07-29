import Component from '../core/base-component';

class Editor extends Component<HTMLDivElement, HTMLFormElement> {
  constructor() {
    super({
      htmlElId: 'link-inserter-form',
      rootElId: 'insert-url',
      templateId: 'template-add-url',
    });
  }

  config(): void {}

  sideEffects(): void {}
}

export default Editor;
