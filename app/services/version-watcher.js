import Service from '@ember/service';
import ENV from 'dumbal-league/config/environment';

export default Service.extend({
  version: null,
  outOfDate: false,
  init () {
    this._super(...arguments)
    const version = ENV.version
    this.set('version', version)
    this.interval = setInterval(() => this.checkVersion(), ENV.versionWatcher.delay)
    this.checkVersion()
  },

  checkVersion: async function () {
    const versionUrl = '/api/version'
    const version = this.get('version')
    let response
    try {
      let response = await fetch(versionUrl)
    } catch (error) {
      console.debug('Could not connect, tuff luck')
      return
    }
    const { version: currentVersion } = await response.json()
    if (currentVersion !== version) {
      clearInterval(this.interval)
      Ember.run(() => this.set('outOfDate', true))
    }
  }
});
