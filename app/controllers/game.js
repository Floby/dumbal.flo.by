import Controller from '@ember/controller';

export default Controller.extend({
  router: Ember.inject.service(),
  queryParams: ['number'],
  number: null,
  newRoundScores: {},

  resetNewRoundScores: function () {
    const newRoundScores = Ember.Object.create(this.get('model.players').map((player) => {
      return player.get('name')
    }).reduce((scores, name) => {
      return Object.assign(scores, { [name]: 0 })
    }, {}))
    this.set('newRoundScores', newRoundScores)
  }.observes('model.newRoundCount'),

  isFinishingRound: function () {
    return this.get('router.currentRouteName') === 'game.round'
  }.property('router.currentRouteName')
});
