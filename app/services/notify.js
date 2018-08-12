import Service from '@ember/service';
import EmberObject from '@ember/object'
import { run } from '@ember/runloop'

export default Service.extend({
  init () {
    this._super(...arguments)
    this.set('notifications', [])
  },
  warning (content) {
    const notification = EmberObject.create({
      type: 'warn',
      content
    })
    this.get('notifications').pushObject(notification)
    setTimeout(() => {
      this.expireNotification(notification)
    }, 3000)
  },

  expireNotification (notification) {
    run(() => notification.set('removed', true))
    setTimeout(() => {
      run(() => this.get('notifications').removeObject(notification))
    }, 1000)
  }
});
