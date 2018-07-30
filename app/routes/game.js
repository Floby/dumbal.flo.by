import Route from '@ember/routing/route';
import Game from '../models/game';

export default Route.extend({
  model: function (params) {
    return Game.load(params.game_id)
  },

  actions: {
    addRound(scores) {
      const game = this.modelFor('game')
      const id = game.get('id')
      game.addRound(scores)
      game.save()
      this.transitionTo('game', game);
    }
  }
});
