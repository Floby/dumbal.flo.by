import Controller from '@ember/controller';
import { inject } from "@ember/service"
import EmberObject, { computed, observer } from "@ember/object"

export default Controller.extend({
  router: inject(),
  queryParams: ['number'],
  number: null,
  newRoundScores: null,

  init () {
    this._super(...arguments)
    this.set('newRoundScores', {})
  },

  resetNewRoundScores: observer('model.newRoundCount', function () {
    const newRoundScores = EmberObject.create(this.get('model.players').map((player) => {
      return player.get('name')
    }).reduce((scores, name) => {
      return Object.assign(scores, { [name]: null })
    }, {}))
    this.set('newRoundScores', newRoundScores)
  }),

  isFinishingRound: computed('router.currentRouteName', function () {
    return this.get('router.currentRouteName') === 'game.round'
  }),
  isExporting: computed('router.currentRouteName', function () {
    return this.get('router.currentRouteName') === 'game.export'
  })
});
