/* eslint-env node */
const Api = require('../../api')

module.exports = function(app) {
  app.use('/api', Api())
};
