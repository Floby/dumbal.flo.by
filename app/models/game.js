import uuidv4 from 'uuid/v4';
import store from 'store2';
import { computed } from '@ember/object'

const gameStore = store.namespace('games.v0')
const loaded = {}

const Game = Ember.Object.extend({
  name: null,
  players: null,
  roundCount: function () {
    const rounds = this.get('players').map((player) => {
      return player.get('roundCount')
    })
    return Math.max(...rounds)
  }.property('players.@each.roundCount'),

  newRoundCount: function () {
    return this.get('roundCount') + 1
  }.property('roundCount'),

  isOver: computed('players.@each.isOut', function () {
    const playing = this.get('players').map((player) => {
      return player.get('isOut') ? 0 : 1
    }).reduce((isOutCount, isOut) => isOut + isOutCount)
    return playing <= 1;
  }),

  init () {
    if (!this.get('id')) {
      this.set('id', uuidv4())
    }
    if(!this.get('name')) {
      this.set('name', `Partie ${this.get('id')}`)
    }
    this.set('players', [])
  },

  addPlayer (name) {
    const player = Player.create({ name })
    this.get('players').pushObject(player)
  },

  addRound (scores) {
    Object.entries(scores).forEach(([name, score]) => {
      const player = this.get('players').find((player) => player.get('name') === name)
      if (!player.get('isOut')) {
        player.addRound(Number(score))
      }
    })
  },

  save () {
    const serialized = {
      name: this.get('name'),
      players: this.get('players').map((player) => {
        return {
          name: player.get('name'),
          scores: player.get('scores')
        }
      })
    }
    gameStore.set(this.get('id'), serialized);
  },
  updateFromPayload (serialized) {
    this.set('name', serialized.name)
    const loadedPlayers = serialized.players.map((player) => {
      return Player.create(player)
    })
    this.set('players', loadedPlayers)
  }
})

Game.load = function (gameId) {
  if (loaded[gameId]) {
    return loaded[gameId]
  }
  const serializedGame = gameStore.get(gameId);
  if (!serializedGame) {
    throw Error(`Could not find Game with Id ${String(gameId)}`)
  }
  const game = Game.create({ id: gameId })
  game.updateFromPayload(serializedGame)
  loaded[gameId] = game
  return game
}

Game.list = function () {
  const keys = gameStore.keys()
  return keys.map((key) => Game.load(key))
}

export default Game

const Player = Ember.Object.extend({
  name: null,
  scores: null,
  score: function () {
    return this.get('scores').reduce((total, round) => round + total, 0)
  }.property('scores.length'),

  init () {
    if (!this.get('scores')) {
      this.set('scores', [])
    }
  },
  isOut: function () {
    return this.get('score') >= 120
  }.property('score'),

  roundCount: function () {
    return this.get('scores.length')
  }.property('scores.length'),

  addRound (roundScore) {
    this.get('scores').pushObject(roundScore)
  }
})
