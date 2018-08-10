import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { DumbalError } from '../models/game'

export default Route.extend({
  notify: inject(),
  game: inject(),
  model: function (params) {
    return this.get('game').getById(params.game_id);
  },

  actions: {
    addRound(scores) {
      const game = this.modelFor('game')
      try {
        game.addRound(scores)
        this.get('game').save(game)
        this.transitionTo('game', game);
      } catch (error) {
        if (error instanceof DumbalError) {
          return this.get('notify').warning(error.message)
        }
      }
    },
    removeRound (roundNumber) {
      const game = this.modelFor('game')
      game.removeRound(roundNumber)
      this.get('game').save(game)
    }
  }
});
