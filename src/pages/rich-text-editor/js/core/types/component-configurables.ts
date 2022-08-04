export interface ComponentConfigurables {
  /**
   * Implement configure method
   */
  renderConfigs?: () => void;

  /**
   * Implement A method to add side effects
   */
  effectsConfigs?: () => void;

  /**
   * Sets The HTML ID
   */
  htmlElId?: string;
}
