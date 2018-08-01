/* eslint-disable no-console */
require('dotenv').config()
const Path = require('path')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const Api = require('./index')

const DIST_DIR = Path.resolve(__dirname, '../dist')
const PORT = process.env.PORT || 3000

startRegular()

function startRegular () {
  const server = express()
  server.use(morgan('dev'))
  server.use(compression())

  server.use('/api', Api())

  server.use(express.static(DIST_DIR))
  server.use((req, res, next) => {
    res.sendFile(Path.resolve(DIST_DIR, 'index.html'), (err) => {
      if (err) next(err)
    })
  })

  server.use((error, req, res, next) => {
    console.error(error)
    next(error)
  })

  server.listen(PORT)
}
/* eslint-disable-next-line no-unused-vars */
function startFastboot () {
  const FastbookAppServer = require('fastboot-app-server')
  const server = new FastbookAppServer({
    distPath: DIST_DIR,
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
