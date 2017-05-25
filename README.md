# gamedevjs [![NPM version](https://badge.fury.io/js/gamedevjs.svg)](https://npmjs.org/package/gamedevjs) [![Build Status](https://travis-ci.org/nshermione/gamedevjs.svg?branch=master)](https://travis-ci.org/nshermione/gamedevjs)

> game development toolkit

## Installation

```sh
$ npm install --save gamedevjs
```

## Usage

### Scheduler

#### Creation
Schedule tasks at specific times
```js
var gamedev = require("gamedevjs").gamedev;

var scheduler = gamedev.scheduler.config([
    {at: 200, run: function() {console.log("Hello 200ms")} },
    {at: 1300, run: function() {console.log("Hello 1300ms")} },
    {at: 5000, run: function() {console.log("Hello 5000ms")} },
]);

scheduler.start();
```

Schedule sequence tasks
```js
var gamedev = require("gamedevjs").gamedev;

var scheduler = gamedev.scheduler.sequence([
    {duration: 1100, run: function() {console.log("Hello 200ms")} },
    {duration: 3700, run: function() {console.log("Hello 1300ms")} },
    {duration: 100, run: function() {console.log("Hello 5000ms")} },
]);

// start scheduler with delay time
scheduler.start(200);
```

#### Manipulation
Push task with specific time
```js
...
// push and schedule addional task
scheduler.pushStep({
    at: 4000,
    run: function() {
        console.log("Hello 4000ms");
    }
})

// or we can push task when scheduler is running
// and make sure scheduler have not reached 4000ms (3990ms for sure)
setTimeout(function() {
    scheduler.pushStep({
        at: 4000,
        run: function() {
            console.log("Hello 4000ms");
        }
    })
}, 3000);
```

Stop scheduler will terminate all running tasks
```
scheduler.stop();
```

## License

ISC © [Thinh Tran](https://www.facebook.com/ththinh)


[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=A889ABEB4LBYE)
