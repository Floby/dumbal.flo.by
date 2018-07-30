import Component from '@ember/component';
import { inject } from '@ember/service'

export default Component.extend({
  screenTitle: inject(),
  title: null,
  positionalParams: ['title'],

  didRender () {
    const title = this.get('title')
    this.get('screenTitle').pushTitle(this.get('title'))
  },

  didDestroyElement () {
    const title = this.get('title')
    this.get('screenTitle').popTitle(this.get('title'))
  }
});
