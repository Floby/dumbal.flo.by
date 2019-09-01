import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object'
import { inject }  from '@ember/service'
import { run }  from '@ember/runloop'
import OnHold from '../mixins/on-hold'

export default Component.extend(OnHold, {
  tagName: 'header',
  classNames: ['screen-title'],
  screenTitle: inject(),
  primaryTitle: alias('screenTitle.primaryTitle'),
  secondaryTitle: alias('screenTitle.secondaryTitle'),
  profileLinkPresence: alias('screenTitle.profileLinkPresence'),
  navigationHome: computed('screenTitle.navigationType', function () {
    return this.get('screenTitle.navigationType') === 'home'
  }),
  navigationBack: computed('screenTitle.navigationType', function () {
    return this.get('screenTitle.navigationType') === 'back'
  }),
  hasNavigation: computed('navigationBack', 'navigationHome', function () {
    return this.navigationBack  || this.navigationHome;
  }),

  onHold () {
    const version = this.version
    window.alert(`Version courante : ${version}`)
  },

  actions: {
    goBack () {
      run(() => history.back())
    }
  }
});
