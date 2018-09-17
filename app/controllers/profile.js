import Controller from '@ember/controller';
import { inject } from '@ember/service'
import { computed } from '@ember/object'

export default Controller.extend({
  auth: inject(),
  isAuthenticated: computed.alias('auth.isAuthenticated'),
});
