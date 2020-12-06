'use strict'

module.exports = function vsource (source, file) {
  if (typeof source !== 'string' || source === '') {
    throw new TypeError('The "source" argument must be a non-empty string')
  }

  const fail = function (file, reason, pos, ruleId) {
    // Avoid vfile#fail() because it throws
    const msg = file.message(reason, pos, origin(ruleId))
    msg.fatal = true
    return msg
  }

  const warn = function (file, reason, pos, ruleId) {
    return file.message(reason, pos, origin(ruleId))
  }

  const info = function (file, reason, pos, ruleId) {
    return file.info(reason, pos, origin(ruleId))
  }

  const origin = function (ruleId) {
    return [source, ruleId || null]
  }

  const bind = function (...args) {
    return {
      fail: fail.bind(null, ...args),
      warn: warn.bind(null, ...args),
      info: info.bind(null, ...args),
      origin,
      bind
    }
  }

  return file ? bind(file) : bind()
}
