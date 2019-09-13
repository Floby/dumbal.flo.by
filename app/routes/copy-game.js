import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  serializer: inject('game-serializer'),
  game: inject(),
  actions: {
    copyGame (text) {
      const game = this.serializer.deserialize(text)
      this.game.save(game)
      this.transitionTo('game', game)
    }
  }
});
