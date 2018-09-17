import UrlAssembler from 'url-assembler'
import { computed } from '@ember/object'
import Service, { inject } from '@ember/service'
import { isPresent } from '@ember/utils'
import config from 'dumbal-league/config/environment';
import crypto from 'crypto-js'
import ms from 'ms'


const AUTH_CONFIG = config.auth0;
const baseAuthUrl = UrlAssembler(`https://${AUTH_CONFIG.domain}`)

export default Service.extend({
  router: inject(),
  localStore: inject(),
  lastUpdated: null,
  init () {
    this._super(...arguments)
    this.sessionStore = this.get('localStore').namespace('auth');
    this.stateStore = this.get('localStore').namespace('authstate');
    this.refreshCheckInterval = setInterval(() => this.checkRefresh(), ms('30 seconds'))
    this.setupExpirationTimeout()
    this.checkRefresh()
  },

  async login() {
    const state = randomBytesAsBase64(8)
    const verifierPair = generateVerifierPair()
    this.stateStore.set(state, verifierPair)
    const authorizeUrl = baseAuthUrl
      .segment('/authorize')
      .query({
        code_challenge: verifierPair.challenge,
        code_challenge_method: 'S256',
        state: state,
        response_type: 'code',
        scope: 'openid profile user_metadata offline_access',
        client_id: AUTH_CONFIG.clientId,
        client_secret: AUTH_CONFIG.clientSecret,
        redirect_uri: window.location.origin + '/profile',
      })
      .toString()

    window.location = authorizeUrl
  },

  async tryToAuthenticate(queryParams) {
    if (queryParams.code) {
      try {
        const { verifier } = this.stateStore.get(queryParams.state)
        this.stateStore.remove(queryParams.state)
        const tokenUrl = `https://${AUTH_CONFIG.domain}/oauth/token`;
        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'client_id': AUTH_CONFIG.clientId,
            'client_secret': AUTH_CONFIG.clientSecret,
            'grant_type': 'authorization_code',
            'redirect_uri': window.location.origin + '/profile',
            'code': queryParams.code,
            code_verifier: verifier
          })
        })
        const reply = await response.json()
        if (reply.access_token && reply.id_token) {
          this.setSession(reply)
          await this.syncUserInfo(reply.access_token)
          this.eraseAuthParameters()
        }
      } catch (error) {
        throw error
      }
    }
  },

  async checkRefresh () {
    const session = this.getSession()
    const shouldRefresh = !this.get('isAuthenticated') && session.refresh_token
    if (!shouldRefresh) {
      return
    }
    debugger
    const refreshUrl = baseAuthUrl
      .segment('/oauth/token')
      .toString()
    const response = await fetch(refreshUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: AUTH_CONFIG.clientId,
        client_secret: AUTH_CONFIG.clientSecret,
        refresh_token: session.refresh_token
      })
    })
    const body = await response.json()
    this.setSession(Object.assign({ refresh_token: session.refresh_token }, body))
  },

  async fetchUserInfo(accessToken) {
    const userInfoUrl = baseAuthUrl.segment('/userinfo')
    const userInfoResponse = await fetch(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return userInfoResponse.json()
  },

  async syncUserInfo (accessToken) {
    const userInfo = await this.fetchUserInfo(accessToken)
    this.setUserInfo(userInfo)
  },

  setUserInfo (userInfo) {
    this.sessionStore.set('userInfo', userInfo)
  },

  userInfo: computed('lastUpdated', function () {
    return this.sessionStore.get('userInfo')
  }).volatile(),

  eraseAuthParameters () {
    //const router = this.get('router')
    //const pathWithoutHash = router.currentURL.split('#').shift()
    const pathWithoutHash = '/profile'
    history.replaceState({ path: pathWithoutHash }, pathWithoutHash, pathWithoutHash);
  },

  isAuthenticated: computed('session.access_token', 'isExpired', function() {
    return this.get('session.access_token') && !this.get('isExpired')
  }),

  session: computed(function () {
    const session = this.getSession()
    return session
  }).volatile(),

  getSession() {
    return {
      access_token: this.sessionStore.get('access_token'),
      refresh_token: this.sessionStore.get('refresh_token'),
      id_token: this.sessionStore.get('id_token'),
      expires_at: new Date(this.sessionStore.get('expires_at'))
    };
  },

  accessToken: computed('lastUpdated', function () {
    return this.getSession().access_token
  }),

  setSession(authResult) {
    this.set('lastUpdated', Date.now());
    if (authResult && authResult.access_token && authResult.id_token) {
      // Set the time that the access token will expire at
      let expiresAt = (authResult.expires_in * 1000) + new Date().getTime();
      this.sessionStore.set('access_token', authResult.access_token);
      this.sessionStore.set('refresh_token', authResult.refresh_token);
      this.sessionStore.set('id_token', authResult.id_token);
      this.sessionStore.set('expires_at', expiresAt);
      Ember.notifyPropertyChange(this, 'session')
      this.setupExpirationTimeout()
    }
  },

  logout() {
    // Clear access token and ID token from local storage
    this.sessionStore.remove('access_token');
    this.sessionStore.remove('id_token');
    this.sessionStore.remove('expires_at');
  },

  isExpired: computed('session.expires_at', function () {
    let expiresAt = this.get('session.expires_at');
    return Date.now() > expiresAt.getTime();
  }),

  setupExpirationTimeout() {
    if (this._expirationTimeout) {
      clearTimeout(this._expirationTimeout)
      this._expirationTimeout = null
    }
    let expiresAt = this.get('session.expires_at');
    if (!expiresAt) {
      return
    }
    const delay = expiresAt.getTime() - Date.now()
    if (delay > 0) {
      this._expirationTimeout = setTimeout(() => {
        Ember.notifyPropertyChange(this, 'session.expires_at')
      }, delay)
    }
  }
})


function randomBytesAsBase64 (nBytes) {
  return base64URLEncode(crypto.lib.WordArray.random(nBytes))
}

function generateVerifierPair () {
  const verifier = randomBytesAsBase64(32)
  const challenge = base64URLEncode(sha256(crypto.enc.Utf8.parse(verifier)))
  return { verifier, challenge }
}


function sha256(buffer) {
  return crypto.SHA256(buffer)
}

function base64URLEncode(buffer) {
  return crypto.enc.Base64.stringify(buffer)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}
