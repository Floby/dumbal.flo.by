import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import GoogleAnalyticsRoute from 'ember-tracker/mixins/google-analytics-route';

const Router = EmberRouter.extend(GoogleAnalyticsRoute, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('game', {
    path: 'games/:game_id'
  }, function() {
    this.route('round');
    this.route('export');
  });
  this.route('new-game');
  this.route('profile');
});

export default Router;
