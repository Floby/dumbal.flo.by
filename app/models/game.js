export default Ember.Object.extend({
  players: null,
  rounds: 0,
  newRoundCount: function () {
    return this.get('rounds') + 1
  }.property('rounds'),

  init () {
    this.set('id', Math.floor(Math.random() * 100))
    this.set('players', [
      Player.create({name: 'Florent', score: 0 }),
      Player.create({name: 'Maud', score: 0}),
      Player.create({name: 'Marjo', score: 0}),
      Player.create({name: 'Romain', score: 0}),
    ])
  },

  addRound (scores) {
    this.get('players').forEach((player) => {
      const currentScore = Number(player.get('score'))
      const name = player.name
      const pointsToAdd = Number(scores.get(name))
      player.set('score', currentScore + pointsToAdd)
    })
    this.set('rounds', this.get('rounds') + 1)
  }
})

const Player = Ember.Object.extend({
  name: null,
  score: 0,
  isOut: function () {
    return this.get('score') >= 120
  }.property('score')
})
