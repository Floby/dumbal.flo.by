import Route from '@ember/routing/route';
import Game from '../models/game';

export default Route.extend({
  model () {
    return Game.list()
  }
});
