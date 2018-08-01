import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  versionWatcher: inject(),
  needsRefresh: computed.alias('versionWatcher.outOfDate'),
  action: {
    refreshWindow () {
      window.refresh()
    }
  }
});
