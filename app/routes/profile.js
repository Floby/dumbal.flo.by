import Route from '@ember/routing/route';
import { inject } from '@ember/service'

export default Route.extend({
  auth: inject(),
  async beforeModel (params) {
    const auth = this.get('auth')
    await auth.tryToAuthenticate(params.queryParams)
  },

  async model (params) {
    const auth = this.get('auth')
    if (auth.get('userInfo')) {
      return auth.get('userInfo')
    } else {
      return auth.login()
    }
  },

  actions: {
    async refreshLogin () {
      const auth = this.get('auth')
      await auth.login()
    }
  }
});
