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
  FEAT_PREFER_HTTPS: flag()
    .default(false)
    .description('Redirect users to the https version of the website or API')
})

function flag () {
  return Joi.boolean()
    .truthy('enabled')
    .truthy('yes')
    .truthy('1')
    .truthy('disabled')
    .truthy('no')
    .truthy('0')
    .insensitive()
}
