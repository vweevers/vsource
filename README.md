# vsource

**Add [messages](https://github.com/vfile/vfile-message) to a [vfile](https://github.com/vfile/vfile) bound to a plugin source.**

[![npm status](http://img.shields.io/npm/v/vsource.svg)](https://www.npmjs.org/package/vsource)
[![node](https://img.shields.io/node/v/vsource.svg)](https://www.npmjs.org/package/vsource)
![Test](https://github.com/vweevers/vsource/workflows/Test/badge.svg?branch=main)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

```js
const vsource = require('vsource')
const vfile = require('vfile')

const file = vfile({ path: 'package.json' })
const s = vsource('my-lint-plugin', file)

// Add error message to file
s.fail('Name must be lowercase', pos, 'lowercase-name')
```

Which is just a convenient shortcut for:

```js
file.fail('Name must be lowercase', pos, 'my-lint-plugin:lowercase-name')
```

In addition, `fail()` can be called multiple times to collect more than one error, unlike [`VFile#fail()`](https://github.com/vfile/vfile#vfilefailreason-position-origin) which immediately terminates the process. I'm taking a slightly different approach to linting (than [`remark-lint`](https://github.com/remarkjs/remark-lint) et al): both error and warning messages are lint failures, but warnings can be ignored by the user. This behavior is closer to the [`standard`](https://github.com/standard/standard) linter. While `remark-lint` normally only produces warning messages, reserving error messages for unexpected exceptions.

## API

### `s = vsource(source[, file])`

If a `file` argument is provided, it does not have to be passed into the below methods.

### `message = s.fail([file, ]reason, position, ruleId)`

Add error message to `file`, similar to `VFile#fail()`. Sets [`message.fatal`](https://github.com/vfile/vfile-message#fatal) to `true`.

### `message = s.warn([file, ]reason, position, ruleId)`

Add warning message to `file`, same as `VFile#message()`. Sets `message.fatal` to `false`.

### `message = s.info([file, ]reason, position, ruleId)`

Add info message to `file`, same as `VFile#info()`. Sets `message.fatal` to `null`.

## Install

With [npm](https://npmjs.org) do:

```
npm install vsource
```

## License

[MIT](LICENSE) © Vincent Weevers
