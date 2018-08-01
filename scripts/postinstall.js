const Path = require('path')
const fs = require('fs')
const sourceVersionPath = Path.resolve(__dirname, '..', 'api', 'version')
if (process.env.SOURCE_VERSION) {
  fs.writeFileSync(sourceVersionPath, process.env.SOURCE_VERSION)
} else {
  try {
    fs.unlinkSync(sourceVersionPath);
  } catch (error) {}
}
