import Component from '@ember/component';
import { computed } from '@ember/object'
import { inject }  from '@ember/service'

export default Component.extend({
  screenTitle: inject(),
  primaryTitle: computed.alias('screenTitle.primaryTitle'),
  secondaryTitle: computed.alias('screenTitle.secondaryTitle'),
  navigationHome: computed('screenTitle.navigationType', function () {
    return this.get('screenTitle.navigationType') === 'home'
  }),
  navigationBack: computed('screenTitle.navigationType', function () {
    return this.get('screenTitle.navigationType') === 'back'
  }),
  hasNavigation: computed('navigationBack', 'navigationHome', function () {
    return this.get('navigationBack')  || this.get('navigationHome')
  }),
  actions: {
    goBack () {
      Ember.run(() => history.back())
    }
  }
});
