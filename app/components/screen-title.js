import Component from '@ember/component';
import { inject } from '@ember/service'

export default Component.extend({
  screenTitle: inject(),
  title: null,
  navigation: null,
  profileLink: false,
  positionalParams: ['title'],

  didRender () {
    this.screenTitle.pushTitle(this.title)
    if (this.navigation) {
      this.get('screenTitle.navigations').pushObject(this.navigation)
    }
    this.screenTitle.profileLinkPresenceIn(Boolean(this.profileLink))
  },

  didDestroyElement () {
    this.screenTitle.popTitle(this.title)
    if (this.navigation) {
      this.get('screenTitle.navigations').popObject(this.navigation)
    }
    this.screenTitle.profileLinkPresenceOut()
  }
});
