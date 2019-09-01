import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { inject } from '@ember/service'
import { computed } from '@ember/object'

export default Component.extend({
  notify: inject(),
  classNames: ['notify-container'],
  notifications: alias('notify.notifications')
});
