import uuidv4 from 'uuid/v4';
export default Ember.Object.extend({
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
  }
})

const Player = Ember.Object.extend({
  name: null,
  score: function () {
    return this.get('scores').reduce((total, round) => round + total, 0)
  }.property('scores.length'),

  init () {
    this.set('scores', [])
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
