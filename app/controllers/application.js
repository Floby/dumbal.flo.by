import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  versionWatcher: inject(),
  needsRefresh: alias('versionWatcher.outOfDate'),
  version: alias('versionWatcher.version'),
  actions: {
    refreshWindow () {
      location.reload()
    },
    goBack () {
    }
  }
});
