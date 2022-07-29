import Component from '../core/base-component';

class InsertLink extends Component<HTMLDivElement, HTMLFormElement> {
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

export default InsertLink;
