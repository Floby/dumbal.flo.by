import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  titles: [],
  pushTitle(title) {
    this.titles.pushObject(title)
  },
  popTitle(title) {
    this.titles.removeObject(title)
  },

  primaryTitle: computed.alias('titles.lastObject'),
  secondaryTitle: computed('titles.@each', 'titles.length', function () {
    const titles = this.get('titles')
    return titles[titles.length-2]
  })
});
