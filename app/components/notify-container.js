import Component from '@ember/component';
import { inject } from '@ember/service'
import { computed } from '@ember/object'

export default Component.extend({
  notify: inject(),
  classNames: ['notify-container'],
  notifications: computed.alias('notify.notifications')
});
