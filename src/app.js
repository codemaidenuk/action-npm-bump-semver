const core = require('@actions/core')
const { parseBoolean } = require('@eturino/ts-parse-boolean')
const logger = require('pino')()

module.exports = () => {
  try {
    const preRelease = core.getInput('preRelease')
    if (preRelease == null) {
      throw new Error('You must provide a true/false value for prerelease.')
    }

    const isPreRelease = parseBoolean(preRelease)
    logger.info(`Is Prerelease: ${isPreRelease}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}
