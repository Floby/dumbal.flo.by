import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { DumbalError } from '../models/game'

export default Route.extend({
  notify: inject(),
  game: inject(),
  leagueMode: inject(),
  model: function (params) {
    return this.get('game').getById(params.game_id);
  },

  afterModel (model) {
    if (model.get('isLeague')) {
      this.get('leagueMode').enable()
    } else {
      this.get('leagueMode').disable()
    }
  },
  deactivate () {
      this.get('leagueMode').disable()
  },

  actions: {
    addRound(scores) {
      const game = this.modelFor('game')
      const playerNames = game.get('players').map(({ name }) => name)
      try {
        const beforePlayerCount = game.get('inPlayerCount')
        game.addRound(scores.getProperties(playerNames))
        this.get('game').save(game)
        const afterPlayerCount = game.get('inPlayerCount')
        if (afterPlayerCount < beforePlayerCount) {
          if (afterPlayerCount === 1) {
            this.get('notify').vibratePlayerWin()
          } else {
            this.get('notify').vibratePlayerOut()
          }
        }
        this.transitionTo('game', game);
      } catch (error) {
        if (error instanceof DumbalError) {
          return this.get('notify').warning(error.message)
        } else {
          throw error
        }
      }
    },
    removeRound (roundNumber) {
      const game = this.modelFor('game')
      game.removeRound(roundNumber)
      this.get('game').save(game)
    }
  }
});

