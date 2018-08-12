import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service'

export default Controller.extend({
  randomNames: inject(),
  newGameName: null,
  newPlayerName: null,
  players: null,
  init () {
    this._super(...arguments)
    this.set('players', [])
    this.set('newGameName', null)
    this.set('newPlayerName', null)
    this.set('gameNamePlaceholder', this.get('randomNames').pop())
  },

  hasEnoughPlayers: computed('players.length', 'newPlayerName', function () {
    const newPlayerName = (this.get('newPlayerName') || '').trim()
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
      this.get('players').pushObject(playerName.trim())
      this.set('newPlayerName', null)
    },
    removePlayer(playerName) {
      this.get('players').removeObject(playerName)
    },
    createGame(name, playerNames) {
      let newPlayerName = (this.get('newPlayerName') || '').trim();
      let gameName = (name || '').trim()
      if (!gameName) {
        gameName = this.get('gameNamePlaceholder')
      }
      if (newPlayerName) {
        this.send('startNewGame', gameName, playerNames.concat([newPlayerName.trim()]))
      } else {
        this.send('startNewGame', gameName, playerNames)
      }
      this.init()
    }
  }
});
