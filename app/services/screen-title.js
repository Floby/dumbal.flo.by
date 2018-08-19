import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  titles: null,
  navigations: null,
  init () {
    this._super(...arguments)
    this.set('titles', [])
    this.set('navigations', [])
    this.set('profileLinkPresences', [])
  },
  pushTitle(title) {
    this.titles.pushObject(title)
  },
  popTitle(title) {
    this.titles.removeObject(title)
  },
  profileLinkPresenceIn (isPresent) {
    this.profileLinkPresences.pushObject(isPresent)
  },
  profileLinkPresenceOut () {
    this.profileLinkPresences.popObject()
  },
  profileLinkPresence: computed.alias('profileLinkPresences.lastObject'),

  navigationType: computed.alias('navigations.lastObject'),

  primaryTitle: computed.alias('titles.lastObject'),
  secondaryTitle: computed('titles.{@each,length}', function () {
    const titles = this.get('titles')
    return titles[titles.length-2]
  })
});
