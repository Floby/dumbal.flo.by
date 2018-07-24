const Path = require('path')
const FastbookAppServer = require('fastboot-app-server')

const server = new FastbookAppServer({
  distPath: Path.resolve(__dirname, 'dist'),
  gizp: true,
  beforeMiddleware(app) {
    app.use((req, res, next) => {
      if (req.headers['x-forwarded-proto'] === 'https') {
        return next()
      } else {
        return res.redirect(301, `https://${req.hostname}${req.url}`)
      }
    })
  }
})

server.start()
