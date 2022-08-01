import Component from '../core/base-component';
import { ComponentConfigurables } from '../core/types/component-configurables';
import { editorFeatures } from '../data/editor-features';
import { FeatureType } from '../types/editor-types';
import { FeatureButton } from './rte-feature-button';

class Editor
  extends Component<HTMLDivElement, HTMLFormElement>
  implements ComponentConfigurables
{
  constructor() {
    super({
      rootElId: 'root',
      templateId: 'template-rich-editor',
    });

    /// Render editor
    this.renderConfigs();
  }

  /**
   * Configure render options configurations
   */
  renderConfigs() {
    /// Show editor buttons
    this.renderButtons();

    /// Show Editor area
  }

  /// PRIVATE METHODS
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
   * Handles button rendering to the UI
   */
  private renderButtons() {
    const getFeatures = this.filterFeaturesByType(FeatureType.BUTTON);

    getFeatures.forEach(btnAction => {
      new FeatureButton(btnAction);
    });
  }
}

export default Editor;
