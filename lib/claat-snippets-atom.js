'use babel';

import ClaatSnippetsAtomView from './claat-snippets-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  claatSnippetsAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.claatSnippetsAtomView = new ClaatSnippetsAtomView(state.claatSnippetsAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.claatSnippetsAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'claat-snippets-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.claatSnippetsAtomView.destroy();
  },

  serialize() {
    return {
      claatSnippetsAtomViewState: this.claatSnippetsAtomView.serialize()
    };
  },

  toggle() {
    console.log('ClaatSnippetsAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
