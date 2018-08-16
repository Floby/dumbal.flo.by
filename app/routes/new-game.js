import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  queryParams: { from: null },
  model (params, query) {
    if (!params.from) {
      return null
    }
    try {
      const parentGame = this.get('game').getById(params.from)
      return parentGame
    } catch (error) {
      console.error('Could not load parent game', error)
      return null
    }
  },
  game: inject(),
  actions: {
    startNewGame (name, playerNames, isLeague) {
      console.log('arguments', arguments)

      const parent = this.modelFor(this.routeName)
      const game = this.get('game').createNewGame(name, playerNames, parent, isLeague)
      this.transitionTo('game', game)
    }
  }
});
