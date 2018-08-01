const Path = require('path')
const pify = require('pify')
const fs = pify(require('fs'))

let READ_VERSION
try {
  READ_VERSION = fs.readFileSync(Path.resolve(__dirname, 'version'), 'utf8')
} catch (e) {}

exports.get = async function () {
  if (READ_VERSION) {
    return READ_VERSION
  }
  try {
    return getGitVersion()
  } catch (e) {
    return Math.floor(Math.random() * 1000)
  }
}

async function getGitVersion () {
  const gitDir = Path.resolve(__dirname, '../.git')
  const headContent = await fs.readFile(Path.join(gitDir, 'HEAD'), 'utf8')
  if (headContent.startsWith('ref: ')) {
    const refPath = headContent.replace('ref: ', '').trim()
    const refContent = await fs.readFile(Path.join(gitDir, refPath), 'utf8')
    return refContent.trim()
  } else {
    return headContent.trim()
  }
}