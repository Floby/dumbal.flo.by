import Route from '@ember/routing/route';

export default Route.extend({
  redirect (game) {
    if (game.get('isOver')) {
      return this.transitionTo('game', game)
    }
  }
});
