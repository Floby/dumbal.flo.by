const { Envie, Joi } = require('envie')
module.exports = Envie({
  PORT: Joi
    .number()
    .default(3000)
    .description('Port to listen on'),
  UPDATE_WATCH_VERSION_RETRY: Joi
    .string()
    .default('5s')
    .description('The time to indicate pages to wait before checking for newer versions'),
})
