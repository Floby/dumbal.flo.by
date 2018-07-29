import Controller from '@ember/controller';

export default Controller.extend({
  router: Ember.inject.service(),
  queryParams: ['number'],
  number: null,
  roundNumber: function () {
    return this.get('model.newRoundCount')
  }.property('model.newRoundCount'),

  newRoundScores: function () {
    return Ember.Object.create(this.get('model.players').map((player) => {
      return player.get('name')
    }).reduce((scores, name) => {
      return Object.assign(scores, { [name]: 0 })
    }, {}))
  }.property('roundNumber'),

  isFinishingRound: function () {
    return this.get('router.currentRouteName') === 'game.round'
  }.property('router.currentRouteName'),
});
