import Route from '@ember/routing/route';
import { inject } from '@ember/service'

export default Route.extend({
  auth: inject(),
  async beforeModel () {
    const auth = this.get('auth')
    await auth.handleAuthentication()
    if (!auth.get('isAuthenticated')) {
      return auth.login()
    }
  },

  model () {
    const userInfo = this.get('auth.userInfo')
    return userInfo
  }
});
