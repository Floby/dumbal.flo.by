import Controller from '@ember/controller';
import { inject } from "@ember/service"
import EmberObject, { computed } from "@ember/object"

export default Controller.extend({
  router: inject(),
  queryParams: ['number'],
  number: null,
  newRoundScores: null,

  init () {
    this._super(...arguments)
    this.set('newRoundScores', {})
    this.addObserver('model.newRoundCount', () => this.resetNewRoundScores())
  },

  resetNewRoundScores: function () {
    const newRoundScores = EmberObject.create(this.get('model.players').map((player) => {
      return player.get('name')
    }).reduce((scores, name) => {
      return Object.assign(scores, { [name]: null })
    }, {}))
    this.set('newRoundScores', newRoundScores)
  },

  isFinishingRound: computed('router.currentRouteName', function () {
    return this.get('router.currentRouteName') === 'game.round'
  }),
});
