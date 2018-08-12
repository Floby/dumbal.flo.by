import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  game: inject(),
  actions: {
    startNewGame (name, playerNames) {
      const game = this.get('game').createNewGame(name, playerNames)
      this.transitionTo('game', game)
    }
  }
});
