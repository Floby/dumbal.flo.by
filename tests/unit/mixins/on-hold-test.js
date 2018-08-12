import EmberObject from '@ember/object';
import OnHoldMixin from 'dumbal-league/mixins/on-hold';
import { module, test } from 'qunit';

module('Unit | Mixin | on-hold', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let OnHoldObject = EmberObject.extend(OnHoldMixin);
    let subject = OnHoldObject.create();
    assert.ok(subject);
  });
});
