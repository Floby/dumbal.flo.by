import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { DumbalError } from '../models/game'

export default Route.extend({
  notify: inject(),
  game: inject(),
  leagueMode: inject(),
  serializer: inject('game-serializer'),
  model: function (params) {
    const game = this.game.getById(params.game_id);
    console.log(this.serializer.serialize(game))
    return game
  },

  afterModel (model) {
    if (model.get('isLeague')) {
      this.leagueMode.enable()
    } else {
      this.leagueMode.disable()
    }
  },
  deactivate () {
      this.leagueMode.disable()
  },

  actions: {
    addRound(scores) {
      const game = this.modelFor('game')
      const playerNames = game.get('players').map(({ name }) => name)
      try {
        const beforePlayerCount = game.get('inPlayerCount')
        game.addRound(scores.getProperties(playerNames))
        this.game.save(game)
        const afterPlayerCount = game.get('inPlayerCount')
        if (afterPlayerCount < beforePlayerCount) {
          if (afterPlayerCount === 1) {
            this.notify.vibratePlayerWin()
          } else {
            this.notify.vibratePlayerOut()
          }
        }
        this.transitionTo('game', game);
      } catch (error) {
        if (error instanceof DumbalError) {
          return this.notify.warning(error.message);
        } else {
          throw error
        }
      }
    },
    removeRound (roundNumber) {
      const game = this.modelFor('game')
      game.removeRound(roundNumber)
      this.game.save(game)
    }
  }
});

