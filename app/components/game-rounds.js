import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  game: null,
  showGameRounds: false,

  rounds: computed('game.roundCount', 'game.players.@each.scores', function () {
    const roundCount = this.get('game.roundCount')
    const players = this.get('game.players')
    const rounds = []
    for (var i = 0; i < roundCount; ++i) {
      const roundNumber = i+1
      const playerScores = players.map((player) => {
        return player.get('scores')[i] ? String(player.get('scores')[i]) : null
      })
      rounds.push({
        roundNumber,
        playerScores
      })
    }
    return rounds
  }),

  actions: {
    toggleShowGameRounds () {
      this.set('showGameRounds', !this.get('showGameRounds'))
    }
  }
});
