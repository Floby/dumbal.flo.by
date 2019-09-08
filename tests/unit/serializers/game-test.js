import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Game from 'dumbal-league/models/game'

module('Unit | Serializer | game', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let serializer = this.owner.lookup('serializer:game');
    assert.ok(serializer);
  });

  test('it serializes and deserializes a game', function(assert) {
    let serializer = this.owner.lookup('serializer:game');
    const parentId = '1d3b97c0-d287-11e9-956d-234cf5021b45'
    const startDate = '2019-09-09T20:30:00.000Z'
    let game = Game.create({
      id: 'f1b0bd20-d28a-11e9-ab3f-23eee39b2b41',
      name: 'Hello',
      parentId,
      startDate,
      isLeague: true
    })
    game.addPlayer('Alice')
    game.addPlayer('Bob')
    game.addPlayer('Mickey')
    game.addPlayer('Joe')
    game.addRound({
      Alice: 20,
      Bob: 30,
      Mickey: -10,
      Joe: 10
    })
    game.addRound({
      Alice: 19,
      Bob: 30,
      Mickey: -7,
      Joe: 7
    })
    game.addRound({
      Alice: 18,
      Bob: 30,
      Mickey: -10,
      Joe: 14
    })
    game.addRound({
      Alice: 17,
      Bob: 35,
      Mickey: -6,
      Joe: 7
    })
    game.addRound({
      Alice: 17,
      Bob: 0,
      Mickey: -6,
      Joe: 7
    })

    let serializedGame = serializer.serialize(game)
    console.log('serializedGame', serializedGame)


    const expectedJson = {
      v: 1,
      game: {
        id: game.id,
        n: "Hello",
        p: parentId,
        l: 1,
        s: startDate,
        ps: ['Alice', 'Bob', 'Mickey', 'Joe'],
        rs: [
          [20,  19,  18,  17,  17],
          [30,  30,  30,  35],
          [-10, -7, -10,  -6, -6],
          [10,   7,  14,   7,  7]
        ]
      }
    }
    assert.equal(serializedGame, JSON.stringify(expectedJson))

    const parsedGame = serializer.deserialize(JSON.stringify(expectedJson))
    assert.equal(parsedGame.name, game.name)
    assert.equal(parsedGame.id, game.id)
    assert.equal(parsedGame.startDate, game.startDate)
    assert.equal(parsedGame.parentId, game.parentId)
    assert.equal(parsedGame.isLeague, game.isLeague)
    game.players.forEach((player, i) => {
      assert.ok(parsedGame.players[i])
      assert.equal(parsedGame.players[i].name, player.name)
      assert.equal(parsedGame.players[i].score, player.score)
    })
  });
});
