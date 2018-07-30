import Route from '@ember/routing/route';
import Game from '../models/game';

export default Route.extend({
  actions: {
    startNewGame (name, playerNames) {
      const game = Game.create({ name })
      playerNames.forEach((name) => game.addPlayer(name))
      game.save()
      this.transitionTo('game', game)
    }
  }
});
