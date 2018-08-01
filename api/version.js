const Path = require('path')
const pify = require('pify')
const fs = pify(require('fs'))

let READ_VERSION
try {
  READ_VERSION = fs.readFileSync(Path.resolve(__dirname, 'version'), 'utf8')
} catch (e) {
  // eslint-disable-line: no-empty
}

exports.get = function () {
  if (READ_VERSION) {
    return READ_VERSION.trim()
  }
  try {
    return getGitVersion()
  } catch (e) {
    return process.pid
  }
}

function getGitVersion () {
  const gitDir = Path.resolve(__dirname, '../.git')
  const headContent = fs.readFileSync(Path.join(gitDir, 'HEAD'), 'utf8')
  if (headContent.startsWith('ref: ')) {
    const refPath = headContent.replace('ref: ', '').trim()
    const refContent = fs.readFileSync(Path.join(gitDir, refPath), 'utf8')
    return refContent.trim()
  } else {
    return headContent.trim()
  }
}
