import Component from '@ember/component';
import { computed } from '@ember/object'
import { inject }  from '@ember/service'
import ms from 'ms';

export default Component.extend({
  tagName: 'header',
  classNames: ['screen-title'],
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

  holdTimeout: null,
  holdDelay: '1s',
  mouseDown () {
    this.holdTimeout = setTimeout(() => {
      this.hold()
    }, ms(this.get('holdDelay')))
  },

  mouseUp () {
    if (this.holdTimeout) {
      clearTimeout(this.holdTimeout)
      delete this.holdTimeout
    }
  },

  hold () {
    const version = this.get('version')
    window.alert(`Version courante : ${version}`)
  },

  actions: {
    goBack () {
      Ember.run(() => history.back())
    }
  }
});
