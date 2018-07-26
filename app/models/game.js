export default Ember.Object.extend({
  players: null,
  init () {
    this.set('players', [
      Player.create({name: 'Florent'}),
      Player.create({name: 'Maud'}),
      Player.create({name: 'Marjo'}),
      Player.create({name: 'Romain'}),
    ])
  }
})

const Player = Ember.Object.extend({
  name: null,
  score: 0
})
