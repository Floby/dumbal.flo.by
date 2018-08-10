import uuidv4 from 'uuid/v4';
import EmberObject, { computed } from '@ember/object'


export default EmberObject.extend({
  name: null,
  players: null,
  archived: false,
  startDate: null,
  roundCount: computed('players.@each.roundCount', function () {
    const rounds = this.get('players').map((player) => {
      return player.get('roundCount')
    })
    return Math.max(...rounds)
  }),

  newRoundCount: computed('roundCount', function () {
    return this.get('roundCount') + 1
  }),

  isOver: computed('players.@each.isOut', function () {
    const playing = this.get('players').map((player) => {
      return player.get('isOut') ? 0 : 1
    }).reduce((isOutCount, isOut) => isOut + isOutCount)
    return playing <= 1;
  }),

  dealer: computed('isOver', 'roundCount', 'players.@each.scores', 'plauers.@each.isOut', function () {
    if (this.get('isOver') || this.get('roundCount') === 0) {
      return
    }
    const roundCount = this.get('roundCount')
    const lastScores = this.get('players').map((player) => {
      return {
        player,
        lastScore: player.get('scores').objectAt(roundCount - 1)
      }
    })
    const lastBiggestScore = lastScores.sortBy('lastScore').pop()
    if (!lastBiggestScore.player.get('isOut')) {
      return lastBiggestScore.player
    }

    const biggestScorePlayer = this.get('players')
      .filterBy('isIn')
      .sortBy('score')
      .lastObject
    return biggestScorePlayer
  }),

  init () {
    if (!this.get('id')) {
      this.set('id', uuidv4())
    }
    if(!this.get('name')) {
      this.set('name', `Partie ${this.get('id')}`)
    }
    this.set('players', [])
  },

  addPlayer (name) {
    const player = Player.create({ name, game: this })
    this.get('players').pushObject(player)
  },

  addRound (scores) {
    checkHasNegativeScore(scores)
    Object.entries(scores).forEach(([name, score]) => {
      const player = this.get('players').find((player) => player.get('name') === name)
      if (!player.get('isOut')) {
        player.addRound(Number(score) || 0)
      }
    })
  },
  removeRound (roundNumber) {
    Object.values(this.get('players')).forEach((player) => {
      if (player.get('scores.length') >= roundNumber) {
        player.get('scores').removeAt(roundNumber - 1)
      }
    })
  }
})

export const Player = EmberObject.extend({
  name: null,
  game: null,
  scores: null,
  score: computed('scores.length', function () {
    return this.get('scores').reduce((total, round) => round + total, 0)
  }),

  init () {
    if (!this.get('scores')) {
      this.set('scores', [])
    }
  },
  isOut: computed('score', function () {
    return this.get('score') >= 120
  }),

  isDealer: computed('game.dealer', function () {
    return this.get('game.dealer') === this
  }),

  isIn: computed.not('isOut'),

  isWinner: computed('isOut', 'game.isOver', function () {
    return this.get('game.isOver') && !this.get('isOut')
  }),

  roundCount: computed('scores.length', function () {
    return this.get('scores.length')
  }),

  addRound (roundScore) {
    this.get('scores').pushObject(roundScore)
  }
})

function checkHasNegativeScore (scores) {
  const hasNegativeScore = Object.values(scores).some((score) => score < 0)
  if (!hasNegativeScore) {
    throw new NoNegativeScoreError()
  }
}


export class DumbalError extends Error {
  constructor(message) {
    super(message)
  }
}

class NoNegativeScoreError extends DumbalError {
  constructor () {
    super("C'est bizarre. Normalement il devrait y avoir au moins un score négatif")
  }
}

