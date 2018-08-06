import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  game: inject(),
  model: function (params) {
    return this.get('game').getById(params.game_id);
  },

  actions: {
    addRound(scores) {
      const game = this.modelFor('game')
      game.addRound(scores)
      this.get('game').save(game)
      this.transitionTo('game', game);
    },
    removeRound (roundNumber) {
      const game = this.modelFor('game')
      game.removeRound(roundNumber)
      this.get('game').save(game)
    }
  }
});
