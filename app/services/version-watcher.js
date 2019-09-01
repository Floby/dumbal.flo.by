import Service from '@ember/service';
import ENV from 'dumbal-league/config/environment';
import { run } from '@ember/runloop';

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
    const version = this.version
    try {
      const response = await fetch(versionUrl)
      const { version: currentVersion } = await response.json()
      if (currentVersion !== version) {
        clearInterval(this.interval)
        run(() => this.set('outOfDate', true))
      }
    } catch (error) {
      console.warn('Could not connect, tuff luck') // eslint-disable-line no-console
    }
  }
});
