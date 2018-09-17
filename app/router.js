import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('game', {
    path: 'games/:game_id'
  }, function() {
    this.route('round');
  });
  this.route('new-game');
  this.route('profile');
});

export default Router;
