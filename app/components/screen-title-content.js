import Component from '@ember/component';
import { computed } from '@ember/object'
import { inject }  from '@ember/service'

export default Component.extend({
  screenTitle: inject(),
  primaryTitle: computed.alias('screenTitle.primaryTitle'),
  secondaryTitle: computed.alias('screenTitle.secondaryTitle'),
});
