import Component from '@ember/component';
import { inject } from '@ember/service'

export default Component.extend({
  screenTitle: inject(),
  title: null,
  navigation: null,
  profileLink: false,
  positionalParams: ['title'],

  didRender () {
    this.get('screenTitle').pushTitle(this.get('title'))
    if (this.get('navigation')) {
      this.get('screenTitle.navigations').pushObject(this.get('navigation'))
    }
    this.get('screenTitle').profileLinkPresenceIn(Boolean(this.get('profileLink')))
  },

  didDestroyElement () {
    this.get('screenTitle').popTitle(this.get('title'))
    if (this.get('navigation')) {
      this.get('screenTitle.navigations').popObject(this.get('navigation'))
    }
    this.get('screenTitle').profileLinkPresenceOut()
  }
});
