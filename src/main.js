import * as os from 'node:os'

const core = require('@actions/core')
const { spawnSync } = require('node:child_process')

const VERSION = '1.0.0'

function chooseBinary() {
  if (os.platform() === 'linux' && os.arch() === 'x64') {
    return `main-linux-amd64-${VERSION}`
  }
}

const binary = chooseBinary()
const mainScript = `${__dirname}/${binary}`

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    core.debug(`Running ${mainScript}`)
    await spawnSync(mainScript, { stdio: 'inherit' })
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
