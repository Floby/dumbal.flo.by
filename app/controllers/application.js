import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  versionWatcher: inject(),
  needsRefresh: computed.alias('versionWatcher.outOfDate'),
  actions: {
    refreshWindow () {
      location.reload()
    },
    goBack () {
      debugger
    }
  }
});
