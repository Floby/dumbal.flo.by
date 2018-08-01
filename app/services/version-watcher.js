import Service from '@ember/service';
import ENV from 'dumbal-league/config/environment';

export default Service.extend({
  version: null,
  outOfDate: false,
  init () {
    const version = ENV.version
    this.set('version', version)
    let versionUrl = '/api/version'
    if (version) {
      versionUrl += `?last-event-id=${version}`
    }
    const eventSource = new EventSource(versionUrl)
    eventSource.addEventListener('version', (event) => {
      const version = event.data
      this.set('outOfDate', true)
    })
  }
});
