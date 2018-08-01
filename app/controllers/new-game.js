import Controller from '@ember/controller';
import { computed } from '@ember/object';
import faker from 'faker';
faker.locale = 'fr'

export default Controller.extend({
  newGameName: null,
  newPlayerName: null,
  players: null,
  init () {
    this.set('players', [])
    this.set('newGameName', null)
    this.set('newPlayerName', null)
    this.set('gameNamePlaceholder', faker.company.catchPhrase())
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
