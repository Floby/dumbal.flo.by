import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  game: inject(),
  model () {
    return this.game.list();
  },

  actions: {
    archiveGame (game) {
      this.game.archiveGame(game)
    }
  }
});
