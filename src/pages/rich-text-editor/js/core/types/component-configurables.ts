export interface ComponentConfigurables {
  /**
   * Implement configure method
   */
  renderConfigs?: () => void;

  /**
   * Implement A method to add side effects
   */
  eventsConfigs?: () => void;

  /**
   * Sets The HTML ID
   */
  htmlElId?: string;
}
