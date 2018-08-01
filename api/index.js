const SSEWriter = require('sse-writer')
const { Router } = require('express')
const Version = require('./version.js')
const Config = require('./config')

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
  return router
}

