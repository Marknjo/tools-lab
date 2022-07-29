import { ComponentConfigs } from './types/component-configs';
import { INSERTABLE } from './types/insert-positions';

abstract class Component<
  R extends HTMLElement,
  E extends HTMLElement
> {
  template: HTMLTemplateElement;
  rootEl: R;
  htmlEl: E;
  insertPosition: INSERTABLE;

  constructor(options: ComponentConfigs) {
    /// Prep Configs
    this.rootEl = document.getElementById(options.rootElId)! as R;

    this.template = document.getElementById(
      options.templateId
    )! as HTMLTemplateElement;

    this.insertPosition = options.insertPosition
      ? options.insertPosition
      : INSERTABLE.BEFORE_END;

    /// Assign html element
    this.htmlEl = this.getHtmlElement(options);

    // Configure HTML ELEMENT

    // Add effects to the HTML ELEMENT
    this.render();
  }

  /**
   * Render html template to the UI
   */
  private render() {
    this.rootEl.insertAdjacentElement(
      this.insertPosition,
      this.htmlEl
    );
  }

  /**
   * Extract and Configure the HTML Element from the Template
   */
  private getHtmlElement(
    options: Pick<ComponentConfigs, 'htmlElId'>
  ): E {
    const extractHtml = document.importNode(
      this.template.content,
      true
    );

    const extractedHtmlEl = extractHtml.firstElementChild! as E;

    if (options.htmlElId) {
      extractedHtmlEl.id = options.htmlElId;
    }

    return extractedHtmlEl;
  }

  /**
   * Implement configure method
   */
  abstract config(): void;

  /**
   * Implement A method to add side effects
   */
  abstract sideEffects(): void;
}

export default Component;
