require('dotenv').config()
const Path = require('path')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const FastbookAppServer = require('fastboot-app-server')

const DIST_DIR = Path.resolve(__dirname, 'dist')
const PORT = process.env.PORT || 3000

startRegular()

function startRegular () {
  const server = express()
  server.use(morgan('dev'))
  server.use(compression())
  server.use(express.static(DIST_DIR))
  server.use((req, res, next) => {
    res.sendFile(Path.resolve(DIST_DIR, 'index.html'), (err) => {
      if (err) next(err)
    })
  })
  server.listen(PORT)
}
function startFastboot () {
  const server = new FastbookAppServer({
    distPath: Path.resolve(__dirname, 'dist'),
    gizp: true,
    //beforeMiddleware(app) {
      //app.use((req, res, next) => {
        //return next()
        //if (req.headers['x-forwarded-proto'] === 'https') {
          //return next()
        //} else {
          //return res.redirect(301, `https://${req.hostname}${req.url}`)
        //}
      //})
    //}
  })

  server.start()
}
