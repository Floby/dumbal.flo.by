import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Game from 'dumbal-league/models/game'

module('Unit | Model | game', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  //test('it exists', function(assert) {
    //let store = this.owner.lookup('service:store');
    //let model = store.createRecord('game', {});
    //assert.ok(model);
  //});

  test('it knows who is the dealer when there is no draw', function (assert) {
    // Given
    const players = ['A', 'B', 'C']
    const game = Game.create() // When
    players.forEach((name) => game.addPlayer(name))
    // When
    game.addRound({
      A: 12,
      B: 6,
      C: -1
    })
    // Then
    assert.equal(game.get('dealer.name'), 'A')
  })
  test('it knows who is the dealer when there is an elimination', function (assert) {
    // Given
    const players = ['A', 'B', 'C']
    const game = Game.create() // When
    players.forEach((name) => game.addPlayer(name))
    // When
    game.addRound({
      A: 10,
      B: 18,
      C: -3
    })
    game.addRound({
      A: 120,
      B: -1,
      C: 2
    })
    // Then
    assert.equal(game.get('dealer.name'), 'B')
  })
  test('it knows who is the dealer when there is a draw for worse', function (assert) {
    // Given
    const players = ['A', 'B', 'C']
    const game = Game.create() // When
    players.forEach((name) => game.addPlayer(name))
    // When
    game.addRound({
      A: 20,
      B: 18,
      C: -3
    })
    game.addRound({
      A: 25,
      B: 25,
      C: -3
    })
    // Then
    assert.equal(game.get('dealer.name'), 'A')
  })
  test('it adds an endDate when adding the last round', function (assert) {
    // Given
    const players = ['A', 'B', 'C']
    const game = Game.create() // When
    players.forEach((name) => game.addPlayer(name))
    // When
    game.addRound({
      A: 20,
      B: 18,
      C: -3
    })
    game.addRound({
      A: 25,
      B: 25,
      C: -3
    })
    // Then
    assert.equal(game.get('endDate'), null)

    // When
    game.addRound({
      A: 80,
      B: 99,
      C: -1
    })
    const expectedEndDate = moment.utc().format();

    // Then
    assert.equal(game.get('isOver'), true)
    assert.equal(game.get('endDate'), expectedEndDate)
  })
});
