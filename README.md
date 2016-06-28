# Gilp Util

[![travis][travis-image]][travis-url]
[![coverage][coveralls-image]][coveralls-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]
[![js-semistandard-style][semi-image]][semi-url]
[![license][license-image]][license-url]
[![dependencies][dependencies-image]][dependencies-url]
[![dev-dependencies][dev-dependencies-image]][dev-dependencies-url]

Utils for gilp.

## Installation

```bash
npm install gilp-util
```

## Usage

### getArgs()

Read git hook's parameters.

```javascript
  var gilpUtil = require('gilp-util');
  gilpUtil.getArgs();
```

### getBranch()

Get current branch

```javascript
  var gilpUtil = require('gilp-util');
  gilpUtil.getBranch();
```

### getGitDirectory()

Return full path to git directory.

### getBaseDirectory()

Return full path to base directory.

### isInMerge()

Return `true` if a merge is in progress.

## License

Gilp Util is Copyright (c) 2016 sophilabs, inc. It is free software, and may be
redistributed under the terms specified in the [license] file.

## About

[![sophilabs][sophilabs-image]][sophilabs-url]

Gilp Util is maintained and funded by sophilabs, inc. The names and logos for
sophilabs are trademarks of sophilabs, inc.

[license]: /LICENSE
[sophilabs-image]: https://res.cloudinary.com/jsconfuy/image/upload/c_pad,f_auto,h_200,w_200,e_trim/v1426608244/xuwbunompvfjaxuazlwo.png
[sophilabs-url]: https://sophilabs.co
[travis-image]: https://img.shields.io/travis/sophilabs/gilp-util.svg?style=flat-square
[travis-url]: https://travis-ci.org/sophilabs/gilp-util
[npm-image]: https://img.shields.io/npm/v/gilp-util.svg?style=flat-square
[npm-url]: https://npmjs.org/packge/gilp-util
[downloads-image]: https://img.shields.io/npm/dm/gilp-util.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/gilp-util
[semi-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square
[semi-url]: https://github.com/Flet/semistandard
[coveralls-image]: https://img.shields.io/coveralls/sophilabs/gilp-util.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/sophilabs/gilp-util?branch=master
[license-image]: https://img.shields.io/github/license/sophilabs/gilp-util.svg?style=flat-square
[license-url]: /LICENSE
[dependencies-image]: https://david-dm.org/sophilabs/gilp-util.svg?style=flat-square
[dependencies-url]: https://david-dm.org/sophilabs/gilp-util
[dev-dependencies-image]: https://david-dm.org/sophilabs/gilp-util/dev-status.svg?style=flat-square
[dev-dependencies-url]: https://david-dm.org/sophilabs/gilp-util#info=devDependencies
