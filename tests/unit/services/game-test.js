import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { createSandbox } from 'sinon'
import Store from 'store2'

module('Unit | Service | game', function(hooks) {
  setupTest(hooks);
  const testStore = Store.namespace('test')
  let sandbox
  hooks.beforeEach(() => { sandbox = createSandbox() })
  hooks.afterEach(() => sandbox.restore())
  hooks.beforeEach(function () {
    this.owner.register('service:local-store', testStore, { instantiate: false })
  })
  hooks.beforeEach(() => testStore.clear())
  hooks.afterEach(() => testStore.clear())

  // Replace this with your real tests.
  test('it exists', function(assert) {
    const service = this.owner.lookup('service:game');
    assert.ok(service);
  });

  test('It lists games in descending date order', function (assert) {
    // Given
    sandbox.useFakeTimers(Date.now())
    const service = this.owner.lookup('service:game');
    const playerNames = ['A', 'B']
    const expectedOrderNames = [
      'Newest',
      'New',
      'Medium',
      'Old',
      'Oldest'
    ];
    expectedOrderNames.slice().reverse().forEach((name) => {
      service.createNewGame(name, playerNames)
      sandbox.clock.tick(5 * 60 * 1000)
    })
    // When
    const orderedNames = service.list().mapBy('name')
    // Then
    assert.deepEqual(orderedNames, expectedOrderNames)
  })

});


