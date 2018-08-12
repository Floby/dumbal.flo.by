import Service, { inject } from '@ember/service';
import { run } from '@ember/runloop'
import ms from 'ms'

const POOL_IDEAL_SIZE = 50

export default Service.extend({
  localStore: inject(),
  randomNamesStore: null,

  init () {
    this._super(...arguments)
    this.randomNamesStore = this.get('localStore').namespace('random-names')
    this.pollInterval = setInterval(() => {
      run(() => this.checkPool())
    }, ms('2 hours'))
    this.checkPool()
  },

  checkPool: async function () {
    if (this.get('checking')) {
      return
    }
    this.set('checking', true)
    const pool = this.randomNamesStore.get('pool') || []
    if (pool.length < POOL_IDEAL_SIZE) {
      try {
        const missingCount = POOL_IDEAL_SIZE - pool.length
        const response = await fetch(`/api/random-names?count=${missingCount}`)
        const names = await response.json()
        this.randomNamesStore.set('pool', names.concat(pool))
      } catch (error) {
        console.warn('Offline, cannot replenish random name pool')
      }
    }
    this.set('checking', false)
  },

  pop () {
    const pool = this.randomNamesStore.get('pool') || []
    if (!pool.length) {
      return 'Bottomful pit of names'
    }
    const name = pool.pop()
    this.randomNamesStore.set('pool', pool)
    return name
  }
});
