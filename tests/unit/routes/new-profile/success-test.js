import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | new-profile/success', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:new-profile/success');
    assert.ok(route);
  });
});
