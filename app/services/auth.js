import auth0 from 'auth0-js'
import { computed, get } from '@ember/object'
import Service, { inject } from '@ember/service'
import { isPresent } from '@ember/utils'
import config from 'dumbal-league/config/environment';
import pify from 'pify'

const AUTH_CONFIG = config.auth0;

export default Service.extend({
  router: inject(),
  localStore: inject(),
  lastUpdated: null,
  init () {
    this._super(...arguments)
    this.sessionStore = this.get('localStore').namespace('auth');
  },
  webAuth: computed(function () {
    const instance =  new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: window.location.origin + '/profile',
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid profile user_metadata'
    });
    return pify(instance)
  }),

  async login() {
    const authorizeOptions = { }
    const webAuth = get(this, 'webAuth')
    try {
      const credentials = await webAuth.checkSession(authorizeOptions)
      console.log('check session credentials', credentials)
    } catch (err) {
      console.log('check session err', err)
    }
    webAuth.authorize(authorizeOptions);
  },

  async handleAuthentication() {
    const webAuth = this.get('webAuth')
    try {
      const hash = window.location.hash
      if (!hash) {
        return
      }
      const authResult = await webAuth.parseHash({ hash })
      if (!authResult) {
        return
      }
      if (authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        await this.syncUserInfo(authResult.accessToken)
        this.eraseHash()
      }
    } catch (error) {
      console.log('error while handling authentication', error)
    }
  },

  async syncUserInfo (accessToken) {
    const webAuth = this.get('webAuth')
    const getUserInfo = pify(webAuth.client.userInfo.bind(webAuth.client))
    const userInfo = await getUserInfo(accessToken)
    this.setUserInfo(userInfo)
  },

  setUserInfo (userInfo) {
    this.sessionStore.set('userInfo', userInfo)
  },

  userInfo: computed('lastUpdated', function () {
    return this.sessionStore.get('userInfo')
  }).volatile(),

  eraseHash () {
    const router = this.get('router')
    const pathWithoutHash = router.currentURL.split('#').shift()
    history.replaceState({ path: pathWithoutHash }, pathWithoutHash, pathWithoutHash);
  },

  isAuthenticated: computed(function() {
    return isPresent(this.getSession().access_token) && this.isNotExpired();
  }).volatile(),

  getSession() {
    return {
      access_token: this.sessionStore.get('access_token'),
      id_token: this.sessionStore.get('id_token'),
      expires_at: new Date(this.sessionStore.get('expires_at'))
    };
  },

  accessToken: computed('lastUpdated', function () {
    return this.getSession().access_token
  }),

  setSession(authResult) {
    this.set('lastUpdated', Date.now());
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
      this.sessionStore('access_token', authResult.accessToken);
      this.sessionStore('id_token', authResult.idToken);
      this.sessionStore('expires_at', expiresAt);
    }
  },

  logout() {
    // Clear access token and ID token from local storage
    this.sessionStore.remove('access_token');
    this.sessionStore.remove('id_token');
    this.sessionStore.remove('expires_at');
  },

  isNotExpired() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.getSession().expires_at;
    return new Date().getTime() < expiresAt;
  }
});
