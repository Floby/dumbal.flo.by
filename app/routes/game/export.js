import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  serializer: inject('game-serializer'),
  model () {
    const game = this.modelFor('game')
    return this.serializer.serialize(game)
  }
})
