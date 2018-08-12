const SSEWriter = require('sse-writer')
const { Router } = require('express')
const Version = require('./version.js')
const Config = require('./config')
const faker = require('faker')
faker.locale = 'fr'

module.exports = Api

function Api () {
  const router = new Router()
  router.get('/version', async (req, res, next) => {
    try {
      const version = await Version.get()
      if (req.headers.accept.includes('text/event-stream')) {
        const since = req.headers['last-event-id'] || req.query['last-event-id']
        const writer = new SSEWriter()
        writer.pipe(res)
        writer.retry(Config.get('UPDATE_WATCH_VERSION_RETRY'))
        if (since !== version) {
          writer.event(version, 'version', version)
        }
      } else {
        res.send({ version })
      }
    } catch (error) {
      next(error)
    }
  })

  router.get('/random-names', async (req, res, next) => {
    const count = Math.min(Number(req.query.count) || 50, 50)
    const randomNames = []
    for (var i = 0; i < count; ++i) {
      randomNames.push(faker.company.catchPhrase())
    }
    res.send(randomNames)
  })
  return router
}

