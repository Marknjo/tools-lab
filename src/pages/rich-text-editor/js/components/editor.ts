import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';
import { editorFeatures } from '../data/editor-features';
import {
  EditorSupportedFeatures,
  FeatureType,
} from '../types/editor-types';
import { FeatureButton } from './rte-feature-button';
import { FeatureInput } from './rte-feature-input';
import { FeatureSelectInput } from './rte-feature-select-input';
import { FeatureEditorArea } from './rte-features-editor-area';

enum FormatHTMLTagActions {
  BOLD = 'strong',
  ITALIC = 'em',
  UNDERLINE = 'u',
  STRIKETHROUGH = 'strike',
  SUPERSCRIPT = 'sup',
  SUBSCRIPT = 'sub',
  OL_LIST = 'ol',
  UL_LIST = 'ul',
  ANCHOR = 'a',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  PARAGRAPH = 'p',
  SECTION = 'section',
  DIV = 'div',
  ARTICLE = 'article',
  ASIDE = 'aside',
}

class Editor
  extends Component<HTMLDivElement, HTMLFormElement>
  implements ComponentConfigurables
{
  editorAreaEl: HTMLElement | undefined;
  range: Range | undefined;
  selection: Selection | undefined;

  constructor() {
    super({
      rootElId: 'root',
      templateId: 'template-rich-editor',
    });

    /// Render editor
    this.renderConfigs();

    /// Handle effects
    this.effectsConfigs();
  }

  /**
   * Configure render options configurations
   */
  renderConfigs() {
    /// Show editor buttons
    this.renderButtons();
    this.renderInputEls();
    this.renderSelectEls();

    /// Show Editor area
    this.renderEditorArea();
  }

  effectsConfigs() {
    // What is the current clicked button
    // Get the selected menu container
    // get it's description
    // change the text, if it is selected
    // You have to select the text to implement the menu action, except for the font family button
    this.textSelectorHandler();

    this.formatActionsHandler();
  }

  /// PRIVATE METHODS
  /**
   * Handles listening to the click event on supported menu buttons
   */
  private formatActionsHandler() {
    if (this.actionsMenuEl) {
      this.actionsMenuEl.addEventListener('click', event => {
        // handle click events here to change editor section
        // Get the target element
        // Element must be either a button or an italicize html element
        // Get the action name -> If Button, get from button id, if italic, reach out to the button as pare only parent element and grab it's id;
        // Format selected text in the UI

        const clickedEl = event.target as HTMLElement;

        let targetAction: string = '';

        if (clickedEl.tagName === 'I') {
          const btnId = clickedEl.parentElement!.id;
          targetAction = btnId.split('-').slice(1).join('-');
        }

        if (clickedEl.tagName === 'BUTTON') {
          const btnId = clickedEl.id;
          targetAction = btnId.split('-').slice(1).join('-');
        }

        /// @TODO: Add notification if a user clicks the action menu without selecting a string
        if (targetAction && this.range) {
          const selection = this.selection;
          const range = this.range;

          /// handle text formatting
          switch (targetAction) {
            /// Bold Selected Text
            case EditorSupportedFeatures.BOLD:
              this.textFormatterByWrapping(
                FormatHTMLTagActions.BOLD,
                selection,
                range
              );
              break;

            /// Italicize Selected Text
            case EditorSupportedFeatures.ITALICIZE:
              this.textFormatterByWrapping(
                FormatHTMLTagActions.ITALIC,
                selection,
                range
              );
              break;

            /// Underline Selected Text
            case EditorSupportedFeatures.UNDERLINE:
              this.textFormatterByWrapping(
                FormatHTMLTagActions.UNDERLINE,
                selection,
                range
              );
              break;

            /// Strikethrough Selected Text
            case EditorSupportedFeatures.STRIKETHROUGH:
              this.textFormatterByWrapping(
                FormatHTMLTagActions.STRIKETHROUGH,
                selection,
                range
              );
              break;

            /// Superscript Selected Text
            case EditorSupportedFeatures.SUPERSCRIPT:
              this.textFormatterByWrapping(
                FormatHTMLTagActions.SUPERSCRIPT,
                selection,
                range
              );
              break;

            /// Subscript Selected Text
            case EditorSupportedFeatures.SUBSCRIPT:
              this.textFormatterByWrapping(
                FormatHTMLTagActions.SUBSCRIPT,
                selection,
                range
              );
              break;

            /// Align Selected Text to left
            case EditorSupportedFeatures.ALIGN_LEFT:
              this.cssStylesFormatter(range, 'text-left');
              break;

            /// Align Selected Text to center
            case EditorSupportedFeatures.ALIGN_CENTER:
              this.cssStylesFormatter(range, 'text-center');
              break;

            /// Align Selected Text to right
            case EditorSupportedFeatures.ALIGN_RIGHT:
              this.cssStylesFormatter(range, 'text-right');
              break;

            /// Align Selected Text to JUSTIFY
            case EditorSupportedFeatures.ALIGN_JUSTIFY:
              this.cssStylesFormatter(range, 'text-justify');
              break;

            /// Indent Selected Text
            case EditorSupportedFeatures.INDENT:
              this.cssStylesFormatter(
                range,
                EditorSupportedFeatures.INDENT
              );
              break;
          }
        }

        if (!this.range) {
          console.log(
            'Error: select some text in the editor to format '
          );
        }
        event.stopImmediatePropagation();
      });
    }
  }

  /**
   * Adds a css style (Tailwind class) to the top most element
   * i.e. A paragraph, a sibling to the editor root element (Article tag)
   *
   * @TODO: Implement other look up elements i.e. div, section, article, aside,
   * dialog, or li, dl, or even table
   *
   * @param range Range object handle
   * @param className a string of comma separated strings
   *
   */
  private cssStylesFormatter(range: Range, className: string) {
    if (!range)
      return console.log(
        'Error: select some text in the editor to format'
      );
    if (className === '' && typeof className !== 'string')
      return console.log(
        'Error: Must provide a valid class name to format the selected text'
      );

    const selectedEl = range.startContainer.parentElement;

    if (!selectedEl)
      return console.log(
        'Error: select some text in the editor to format'
      );

    let prevEls: HTMLElement[] = [];

    /**
     * Recursive transverse the DOM to the parent element
     *
     * Responsible of toggling a css style (class name) to the parent element
     *
     * @param currentEl html element currently the method is checking
     */
    const isEditorEl = (currentEl: HTMLElement) => {
      prevEls.push(currentEl);

      const editorAreaElId = this.editorAreaEl!.id;

      /// Recursive transverse the DOM to the parent element
      if (
        currentEl.parentElement &&
        currentEl.id !== editorAreaElId
      ) {
        isEditorEl(currentEl.parentElement);
      }

      if (currentEl.id === editorAreaElId && prevEls.length > 1) {
        const parentEl = prevEls.at(-2) as HTMLElement;

        /// Ensure there are no duplicate Alignment styles
        this.removeDuplicateAlignStyles(parentEl, className);

        /// Toggling/Applying multiple css styles
        if (
          (className.includes(',') &&
            className !== EditorSupportedFeatures.INDENT) ||
          (className.includes(',') &&
            className !== EditorSupportedFeatures.OUTDENT)
        ) {
          const styleFormatters = className.split(',');

          styleFormatters.forEach(cssStyle => {
            /// Remove a style if it is already there
            if (parentEl.classList.contains(cssStyle)) {
              parentEl.classList.remove(cssStyle);
            } else {
              // Add a style if not there
              parentEl.classList.add(cssStyle);
            }
          });
        }

        /// Toggling/Applying only a single class name
        if (
          !className.includes(',') &&
          className !== EditorSupportedFeatures.INDENT &&
          className !== EditorSupportedFeatures.OUTDENT
        ) {
          parentEl.classList.toggle(className);
        }

        /// Handling indentation
        const prevElsReset = this.indentSelectedText(
          parentEl,
          className
        );

        prevEls = prevElsReset || [];
      }
    };

    isEditorEl(selectedEl);
  }

  /**
   * Handles formatting of text given the supported html tag, range and selection
   *
   * Text must be selected
   *
   * NB: It formats a selection of text by wrapping it with a html tag
   *
   * @param formatAction HTML tag to surround a selected element
   * @param selection Selection object handle
   * @param range Range object handle
   */
  private textFormatterByWrapping(
    formatAction: FormatHTMLTagActions,
    selection: Selection | undefined,
    range: Range | undefined
  ) {
    if (range && selection) {
      // - Must know which element to select
      const wrappingTagEl = this.el(formatAction);

      let currentTagName = wrappingTagEl.tagName;
      let parentEl = range.startContainer.parentElement;
      let selectedTextTagName = parentEl?.nodeName;

      /// Do not nest similar texts
      if (
        currentTagName !== selectedTextTagName &&
        selectedTextTagName !== 'ARTICLE' // Find a way to change this
      ) {
        range.surroundContents(wrappingTagEl);
        selection.addRange(range);
      }

      /// Undo Wrapping of similar tags if user tries to wrap the tag again
      if (parentEl && currentTagName === selectedTextTagName) {
        const parentElText = document.createTextNode(
          parentEl.innerHTML
        );
        parentEl?.parentElement?.replaceChild(parentElText, parentEl);
      }

      // Release resources
      range.detach();
    }
  }

  /**
   * Handles indent/Outdent of selected paragraph
   * @param parentEl A parent element to lookup the duplicate css styles
   * @param className a string of comma separated strings
   */
  indentSelectedText(parentEl: HTMLElement, className: string) {
    const indentationSupportedLevels = [2, 4, 8, 12, 14, 16, 20];

    const parentElStyles = parentEl.getAttribute('class');
    /// Add first indentation level
    if (!parentElStyles || parentElStyles === '') {
      parentEl.classList.add('indent-2');
      return [];
    }

    /// Already there are some styles, even if it's not indentation

    const indentStyles = parentElStyles
      .split(' ')
      .find(style => style.includes('indent')) as undefined | string;

    /// Add first level indentation
    if (
      !indentStyles &&
      className === EditorSupportedFeatures.INDENT
    ) {
      parentEl.classList.add('indent-2');
      return [];
    }

    /// Already an indentation style

    let [indentStr, indentLevel] = indentStyles!.split('-');

    /// Stop processing if max supported indentation level reached
    if (
      indentationSupportedLevels.at(-1) === parseInt(indentLevel, 10)
    ) {
      return [];
    }

    const foundIdx = indentationSupportedLevels.findIndex(
      level => level === parseInt(indentLevel, 10)
    );

    if (foundIdx > -1) {
      /// Handle adding the next indentation level
      const nextIdx = indentationSupportedLevels.at(foundIdx + 1);

      parentEl.classList.remove(indentStyles!);
      parentEl.classList.add(`${indentStr}-${nextIdx}`);
    }

    return [];
  }

  /**
   * Ensures a parent element does not have duplicate align styles
   * @param parentEl A parent element to lookup the duplicate css styles
   * @param className a string of comma separated strings
   */
  private removeDuplicateAlignStyles(
    parentEl: HTMLElement,
    className: string
  ) {
    /**
     * Text Align Based on Tailwind
     */
    const alignTextAttr = [
      'text-left',
      'text-center',
      'text-right',
      'text-justify',
      'text-start',
      'text-end',
    ];

    // const parentElStyles = parentEl.getAttribute('class');
    let parentElStyles = parentEl.classList.value;

    const duplicateAlignStyle = parentElStyles
      .split(' ')
      .find(style => alignTextAttr.includes(style));

    /// Remove previous added align attribute before proceeding
    if (
      duplicateAlignStyle &&
      !className.split(',').includes(duplicateAlignStyle)
    ) {
      parentEl.classList.remove(duplicateAlignStyle);
    }
  }

  /**
   * Handles selection of a text on the screen.
   */
  private textSelectorHandler() {
    if (this.editorAreaEl) {
      const selection = window.getSelection();

      // Ensure we remove ranges on pointer down
      this.editorAreaEl.addEventListener('pointerdown', () => {
        selection?.removeAllRanges();
      });

      this.editorAreaEl.addEventListener('pointerup', () => {
        const text = selection?.toString();

        let range = selection?.getRangeAt(0).cloneRange();

        /// Do Selection job if we have the text
        if (text && text !== '' && range && selection) {
          /// add event listener here
          // this.formatActionsHandler(selection, range);
          this.range = range;
          this.selection = selection;
        }
      });

      /////
      // var control = document.importNode(
      //   document.querySelector('template').content,
      //   true
      // ).childNodes[0];

      // control.addEventListener('pointerdown', oncontroldown, true);

      // document.querySelector('p').onpointerup = () => {
      //   let selection = document.getSelection(),
      //     text = selection.toString();
      // if (text !== '') {
      //   let rect = selection.getRangeAt(0).getBoundingClientRect();
      //   control.style.top = `calc(${rect.top}px - 48px)`;
      //   control.style.left = `calc(${rect.left}px + calc(${rect.width}px / 2) - 40px)`;
      //   control['text'] = text;
      //   document.body.appendChild(control);
      // }
      // };

      // function oncontroldown(event) {
      //   window.open(
      //     `https://twitter.com/intent/tweet?text=${this.text}`
      //   );
      //   this.remove();
      //   document.getSelection().removeAllRanges();
      //   event.stopPropagation();
      // }

      // document.onpointerdown = () => {
      //   let control = document.querySelector('#control');
      //   if (control !== null) {
      //     control.remove();
      //     document.getSelection().removeAllRanges();
      //   }
      // };

      ////////////////////////////////
    }
  }

  /**
   * A shortcut for creating an element depending with the feature action
   *
   * Targets actions like Bold, Italic, underline, strike, subscript, superscript, list and anchor
   *
   * @param elementName String of element name
   * @returns a crated html element
   */
  private el<H extends HTMLElement>(
    elementName: FormatHTMLTagActions
  ): H {
    return document.createElement(elementName) as H;
  }

  /**
   * Get the editor section
   */
  private get actionsMenuEl() {
    return this.htmlEl.firstElementChild;
  }

  /**
   * Get the editor features of a given type
   * @param featureType
   * @returns a collection of Editor features ButtonsCollection configuration
   */
  filterFeaturesByType(featureType: FeatureType) {
    const filterResults = editorFeatures.filter(
      feat => feat.type === featureType
    );

    return filterResults;
  }

  /**
   * Handles instantiation of the class handling displaying of the editor area
   */
  private renderEditorArea() {
    const editorArea = new FeatureEditorArea();
    this.editorAreaEl = editorArea.editorEl;
  }

  /**
   * Handles button rendering to the UI
   */
  private renderButtons() {
    const getFeatures = this.filterFeaturesByType(FeatureType.BUTTON);

    getFeatures.forEach(btnAction => {
      new FeatureButton(btnAction);
    });
  }

  /**
   * Handlers display of form input control actions to the ui
   */
  private renderInputEls() {
    const configs = this.filterFeaturesByType(FeatureType.INPUT);

    configs.forEach(config => {
      new FeatureInput(config);
    });
  }

  /**
   * Handlers display of form select control actions to the ui
   */
  private renderSelectEls() {
    const configs = this.filterFeaturesByType(FeatureType.SELECT);

    configs.forEach(config => {
      new FeatureSelectInput(config);
    });
  }

  /**
   * Handles Rendering of the editor area
   */
}

export default Editor;
