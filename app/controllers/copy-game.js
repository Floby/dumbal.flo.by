import Controller from '@ember/controller';

export default Controller.extend({
  sent: false,
  actions: {
    setCam(cam) {
      this.set('selectedCam', cam)
    },
    deviceError (error) {
      this.set('errorMessage', error)
    },
    parseGame (game) {
      if (this.sent) return
      const parsed = JSON.parse(game.text)
      this.send('copyGame', game.text)
      this.sent = true
    }
  }
});
