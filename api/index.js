const SSEWriter = require('sse-writer')
const { Router } = require('express')
const Version = require('./version')

module.exports = Api

function Api () {
  const router = new Router()
  router.get('/version', async (req, res, next) => {
    try {
      const version = await Version.get()
      if (req.accepts('text/event-stream')) {
        const since = req.headers['last-event-id'] || req.query['last-event-id']
        const writer = new SSEWriter()
        writer.pipe(res)
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

