import AppHeader from './components/app-header';
import Editor from './components/editor';

function bootstrapEditor() {
  /// Add App Header
  new AppHeader();

  new Editor();
}

export { bootstrapEditor };
