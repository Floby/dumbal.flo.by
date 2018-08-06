import uuidv4 from 'uuid/v4';
import { computed } from '@ember/object'


export default Ember.Object.extend({
  name: null,
  players: null,
  archived: false,
  startDate: null,
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
    const player = Player.create({ name, game: this })
    this.get('players').pushObject(player)
  },

  addRound (scores) {
    Object.entries(scores).forEach(([name, score]) => {
      const player = this.get('players').find((player) => player.get('name') === name)
      if (!player.get('isOut')) {
        player.addRound(Number(score) || 0)
      }
    })
  }
})

export const Player = Ember.Object.extend({
  name: null,
  game: null,
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

  isWinner: computed('isOut', 'game.isOver', function () {
    return this.get('game.isOver') && !this.get('isOut')
  }),

  roundCount: function () {
    return this.get('scores.length')
  }.property('scores.length'),

  addRound (roundScore) {
    this.get('scores').pushObject(roundScore)
  }
})
