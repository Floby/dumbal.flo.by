import Controller from '@ember/controller';

export default Controller.extend({
  newPlayerName: null,
  players: null,
  init () {
    this.set('players', [])
  },

  actions: {
    addPlayer(playerName) {
      this.get('players').pushObject(playerName)
      this.set('newPlayerName', null)
    },
    removePlayer(playerName) {
      this.get('players').removeObject(playerName)
    }
  }
});
