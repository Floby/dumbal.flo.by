import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { inject } from '@ember/service'

export default Controller.extend({
  randomNames: inject(),
  newGameName: null,
  newPlayerName: null,
  players: null,
  init () {
    this._super(...arguments)
    this.initFromEmpty()
  },

  initFromEmpty () {
    this.set('players', [])
    this.set('newGameName', null)
    this.set('newPlayerName', null)
    this.set('gameNamePlaceholder', this.randomNames.pop())
    this.set('isLeague', false)
  },

  initFromGame: observer('model', function () {
    this.initFromEmpty();
    const game = this.model
    if (!game) return;
    this.set('newGameName', `Revanche de ${game.get('name')}`)
    const players = game.get('players').map((player) => player.get('name'))
    this.set('players', players)
  }),

  hasEnoughPlayers: computed('players.length', 'newPlayerName', function () {
    const newPlayerName = (this.newPlayerName || '').trim()
    const playerCount = this.get('players.length')
    if (playerCount > 1) {
      return true
    } else if (playerCount === 1) {
      return Boolean(newPlayerName)
    } else {
      return false;
    }
  }),

  actions: {
    addPlayer(playerName) {
      playerName = playerName || ''
      if (!playerName) {
        return
      }
      this.players.pushObject(playerName.trim())
      this.set('newPlayerName', null)
    },
    removePlayer(playerName) {
      this.players.removeObject(playerName)
    },
    createGame(name, playerNames) {
      let newPlayerName = (this.newPlayerName || '').trim();
      let gameName = (name || '').trim()
      if (!gameName) {
        gameName = this.gameNamePlaceholder
      }
      if (newPlayerName) {
        this.send('startNewGame', gameName, playerNames.concat([newPlayerName.trim()]), this.isLeague)
      } else {
        this.send('startNewGame', gameName, playerNames, this.isLeague)
      }
      this.init()
    }
  }
});
