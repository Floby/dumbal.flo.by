import Route from '@ember/routing/route';
import Game from '../models/game';

export default Route.extend({
  model() {
    return Game.create()
  },

  actions: {
    addRound(scores) {
      const game = this.modelFor('game')
      const id = game.get('id')
      game.addRound(scores)
      this.transitionTo('game', game);
    }
  }
});
