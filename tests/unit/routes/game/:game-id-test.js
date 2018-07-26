import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | game/:game_id', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:game/:game-id');
    assert.ok(route);
  });
});
