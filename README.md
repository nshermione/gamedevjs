# gamedevjs [![NPM version](https://badge.fury.io/js/gamedevjs.svg)](https://npmjs.org/package/gamedevjs) [![Build Status](https://travis-ci.org/nshermione/gamedevjs.svg?branch=master)](https://travis-ci.org/nshermione/gamedevjs)

> game development toolkit

## Installation

```sh
$ npm install --save gamedevjs
```

## Usage

```js
var gamedev = require("gamedevjs").gamedev;

var scheduler = gamedev.scheduler.config([
    {at: 200, run: function() {console.log("Hello 200ms")} },
    {at: 1300, run: function() {console.log("Hello 1300ms")} },
    {at: 5000, run: function() {console.log("Hello 5000ms")} },
]);

scheduler.start();


```

## License

ISC © [Thinh Tran](https://www.facebook.com/ththinh)
