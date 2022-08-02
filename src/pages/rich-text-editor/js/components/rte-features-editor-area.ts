import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';
import { INSERTABLE } from '../core/types/insert-positions';

export class FeatureEditorArea
  extends Component<HTMLElement, HTMLElement>
  implements ComponentConfigurables
{
  /**
   * Handle Editor Default paragraph State
   */
  private defaultParaText: string = 'Write an awesome article...';
  private defaultParaStyle: string = 'text-gray-400';
  private defaultParaId: string = 'default-p';

  constructor() {
    super({
      rootElId: 'feat-sec-editor-area',
      htmlElId: 'feat-editor',
      templateId: 'template-editor-area',
      insertPosition: INSERTABLE.AFTER_BEGIN,
    });

    /// Configs
    this.renderConfigs();
  }

  renderConfigs() {
    this.defaultParaHandler();
  }

  /**
   * Handles Default Paragraph
   *    1. Set the cursor to the start of the paragraph
   *    2. Highlights the paragraph to start input,
   *       making the default text behave like
   *       placeholder text in inputs.
   *    3. Removes default styles | id from the default paragraph
   */
  private defaultParaHandler() {
    const editorArea = this.htmlEl;
    const defaultParaEl = editorArea.querySelector('#default-p') as
      | HTMLParagraphElement
      | undefined;

    const isDefaultPara = this.compareDefaultParagraphText(
      defaultParaEl!
    );

    // Start Evaluation
    if (isDefaultPara && defaultParaEl) {
      const range = new Range();

      const selection = window.getSelection();
      const paraStr = defaultParaEl.childNodes[0];

      range.setStart(paraStr, 0);

      range.collapse(true);

      selection?.removeAllRanges();

      selection?.addRange(range);

      defaultParaEl.focus();

      /// Listen to click implementation
      defaultParaEl.addEventListener('click', () => {
        this.selectDefaultParaText(
          defaultParaEl,
          paraStr,
          range,
          selection!
        );
      });
    }
  }

  /**
   * Ensures there is a para in UI and Para text is default
   *
   * @param defaultParaEl Default paragraph
   * @returns whether there is a paragraph boolean
   */
  private compareDefaultParagraphText(
    defaultParaEl: HTMLParagraphElement
  ) {
    return (
      defaultParaEl &&
      defaultParaEl.textContent === this.defaultParaText
    );
  }

  /**
   * Ensure The default text is selected
   * @param defaultParaEl Default paragraph
   * @param paraStr Paragraph node "text node"
   * @param range range object handle
   * @param selection  Selection handle
   */
  private selectDefaultParaText(
    defaultParaEl: HTMLParagraphElement,
    paraStr: Node,
    range: Range,
    selection: Selection
  ): void {
    if (defaultParaEl.id !== this.defaultParaId) return;

    range.setStart(paraStr, 0);
    range.setEnd(paraStr, (paraStr as unknown as string).length);

    selection?.removeAllRanges();

    selection?.addRange(range);
  }
}
