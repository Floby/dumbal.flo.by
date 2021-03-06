import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  queryParams: { from: null },
  model (params) {
    if (!params.from) {
      return null
    }
    try {
      const parentGame = this.game.getById(params.from)
      return parentGame
    } catch (error) {
      console.error('Could not load parent game', error) // eslint-disable-line no-console
      return null
    }
  },
  game: inject(),
  actions: {
    startNewGame (name, playerNames, isLeague) {
      const parent = this.modelFor(this.routeName)
      const game = this.game.createNewGame(name, playerNames, parent, isLeague)
      this.transitionTo('game', game)
    }
  }
});
