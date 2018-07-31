import Controller from '@ember/controller';

export default Controller.extend({
  newGameName: null,
  newPlayerName: null,
  players: null,
  init () {
    this.set('players', [])
    this.set('newGameName', null)
    this.set('newPlayerName', null)
  },

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
      const newPlayerName = this.get('newPlayerName') || '';
      if (newPlayerName.trim()) {
        this.send('startNewGame', name, playerNames.concat([newPlayerName.trim()]))
      } else {
        this.send('startNewGame', name, playerNames)
      }
      this.init()
    }
  }
});
