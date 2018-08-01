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
      const id = game.get('id')
      game.addRound(scores)
      this.get('game').save(game)
      this.transitionTo('game', game);
    }
  }
});
