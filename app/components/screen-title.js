import Component from '@ember/component';
import { inject } from '@ember/service'

export default Component.extend({
  screenTitle: inject(),
  title: null,
  navigation: null,
  positionalParams: ['title'],

  didRender () {
    const title = this.get('title')
    this.get('screenTitle').pushTitle(this.get('title'))
    if (this.get('navigation')) {
      this.get('screenTitle.navigations').pushObject(this.get('navigation'))
    }
  },

  didDestroyElement () {
    const title = this.get('title')
    this.get('screenTitle').popTitle(this.get('title'))
    if (this.get('navigation')) {
      this.get('screenTitle.navigations').popObject(this.get('navigation'))
    }
  }
});
