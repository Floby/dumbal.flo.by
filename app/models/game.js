export default Ember.Object.extend({
  players: null,
  init () {
    this.set('players', [
      Player.create({name: 'Florent', score: 0 }),
      Player.create({name: 'Maud', score: 45}),
      Player.create({name: 'Marjo', score: -11}),
      Player.create({name: 'Romain', score: 123}),
    ])
  }
})

const Player = Ember.Object.extend({
  name: null,
  score: 0
})
