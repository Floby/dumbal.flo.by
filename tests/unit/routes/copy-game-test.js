import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | copy-game', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:copy-game');
    assert.ok(route);
  });
});
