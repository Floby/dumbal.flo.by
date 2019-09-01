import Service from '@ember/service';
import EmberObject from '@ember/object'
import { run } from '@ember/runloop'

let vibrate = () => false
if (navigator && typeof navigator.vibrate === 'function') {
  vibrate = navigator.vibrate.bind(navigator)
}

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
    this.notifications.pushObject(notification)
    this.vibrateWarn()
    setTimeout(() => {
      this.expireNotification(notification)
    }, 3000)
  },

  expireNotification (notification) {
    run(() => notification.set('removed', true))
    setTimeout(() => {
      run(() => this.notifications.removeObject(notification))
    }, 1000)
  },

  vibrateWarn () {
    vibrate([50, 30, 50])
  },

  vibratePlayerOut () {
    vibrate([200, 50, 50, 10, 50, 10, 50])
  },
  vibratePlayerWin () {
    vibrate([1000])
  }
});
