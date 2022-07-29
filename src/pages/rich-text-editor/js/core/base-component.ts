import { ComponentConfigs } from './types/component-configs';
import { INSERTABLE } from './types/insert-positions';

abstract class Component<
  R extends HTMLElement,
  E extends HTMLElement
> {
  htmlElId: string | undefined;
  htmlEl: E;
  private template: HTMLTemplateElement;
  private rootEl: R;
  private insertPosition: INSERTABLE;

  constructor(options: ComponentConfigs) {
    this.htmlElId = options.htmlElId;
    /// Prep Configs
    this.rootEl = document.getElementById(options.rootElId)! as R;

    this.template = document.getElementById(
      options.templateId
    )! as HTMLTemplateElement;

    this.insertPosition = options.insertPosition
      ? options.insertPosition
      : INSERTABLE.BEFORE_END;

    /// Assign html element
    this.htmlEl = this.getHtmlElement();

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
  private getHtmlElement(): E {
    const extractHtml = document.importNode(
      this.template.content,
      true
    );

    const extractedHtmlEl = extractHtml.firstElementChild! as E;

    if (this.htmlElId) {
      extractedHtmlEl.id = this.htmlElId;
    }

    return extractedHtmlEl;
  }
}

export default Component;
