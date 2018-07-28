import Controller from '@ember/controller';

export default Controller.extend({
  router: Ember.inject.service(),
  queryParams: ['dumbal'],
  dumbal: null,
  isFinishingRound: function () {
    return this.get('router.currentRouteName') === 'game.round'
  }.property('router.currentRouteName'),

  dumballers: function () {
    const dumballer = this.get('dumbal')
    return { [dumballer]: true }
  }.property('dumbal'),

  players: function () {
    return this.get('model.players').map((player) => {
      return RoundPlayer.create({
        name: player.get('name'),
        score: player.get('score')
      })
    })
  }.property('model.players.@each')
});

const RoundPlayer = Ember.Object.extend({
  name: null,
  roundScore: 0,
  isDumballer: false
})
