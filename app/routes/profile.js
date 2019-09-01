import Route from '@ember/routing/route';
import { inject } from '@ember/service'

export default Route.extend({
  auth: inject(),
  notify: inject(),
  async beforeModel (transition) {
    const auth = this.auth
    try {
      await auth.tryToAuthenticate(transition.to.queryParams || {})
    } catch (error) {
      this.notify.warning('Désolé, il y a eu une erreur au moment de login')
      this.transitionTo('index')
    }
  },

  async model () {
    const auth = this.auth
    if (auth.get('userInfo')) {
      return auth.get('userInfo')
    } else {
      return auth.login()
    }
  },

  actions: {
    async refreshLogin () {
      const auth = this.auth
      await auth.login()
    }
  }
});
