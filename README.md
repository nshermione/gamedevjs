# gamedevjs [![NPM version](https://badge.fury.io/js/gamedevjs.svg)](https://npmjs.org/package/gamedevjs) [![Build Status](https://travis-ci.org/nshermione/gamedevjs.svg?branch=master)](https://travis-ci.org/nshermione/gamedevjs)

> game development toolkit

A collection of common components which are widely used in game development:
- Scheduler
- Finite State Machine
- Object Pool
- Event Manager

(other components will be published and documented soon)


*This project is evolving and need your feedback, please create [Issue](https://github.com/nshermione/gamedevjs/issues)*

# Table of contents
- [Installation](#installation)
- [Usage](#usage)
  * [Scheduler](#scheduler)
    + [Creation](#creation)
      - [Schedule tasks at specific times](#schedule-tasks-at-specific-times)
      - [Schedule sequence tasks](#schedule-sequence-tasks)
      - [Repeat](#repeat)
    + [Manipulation](#manipulation)
      - [Push task at specific time](#push-task-at-specific-time)
      - [Stop scheduler will terminate all running tasks](#stop-scheduler-will-terminate-all-running-tasks)
  * [Finite State Machine](#finite-state-machine)
    + [Creation](#creation-1)
    + [Manipulation](#manipulation-1)
    + [Event Handler](#event-handler)
    + [Cancel Event Handler](#cancel-event-handler)
    + [Async Event Handler](#async-event-handler)
  * [Object Pool](#object-pool)
    + [Creation](#creation-2)
      - [Item List](#item-list)
      - [Sample Item](#sample-item)
    + [Combine](#combine)
    + [Manipulation](#manipulation-2)
      - [Clear](#clear)
      - [Get](#get)
      - [Return](#return)
      - [Push](#push)
    + [Events](#events)
  * [Event Manager](#event-manager)
    + [Creation](#creation-3)
    + [Manipulation](#manipulation-3)
      - [Common usage](#common-usage)
      - [Register Once](#register-once)
      - [Register Replace](#register-replace)
      - [Multiple Register](#multiple-register)
      - [Unregister list](#unregister-list)
      - [Unregister All](#unregister-all)
- [License](#license)
- [Author](#author)
- [Donation](#donation)



# Installation

```sh
$ npm install --save gamedevjs
```

# Usage

```js
// Node
var gamedev = require("gamedevjs").gamedev;
```

```js
// ES6
import {gamedev} from "gamedevjs";
```

```html
// Browser
<script>
  var gamedev = window.gamedevjs.gamedev;
</script>
```

## Scheduler

<br />

### Creation


<br />

#### Schedule tasks at specific times
```js
var scheduler = gamedev.scheduler.config([
    {at: 200, run: function() {console.log("Hello 200ms")} },
    {at: 1300, run: function() {console.log("Hello 1300ms")} },
    {at: 5000, run: function() {console.log("Hello 5000ms")} },
]);

scheduler.start();
```

<br />

#### Schedule sequence tasks
```js

var scheduler = gamedev.scheduler.sequence([
    {duration: 1100, run: function() {console.log("Hello 200ms")} },
    {duration: 3700, run: function() {console.log("Hello 1300ms")} },
    {duration: 100, run: function() {console.log("Hello 5000ms")} },
]);

// start scheduler with delay time
scheduler.start(200);
```


<br />

#### Repeat
```js
// start scheduler with no delay time, repeat 3 times
scheduler.start(0, 3);

// start scheduler with no delay time, repeat forever
scheduler.start(0, -1);

// start scheduler with 200ms delay time, repeat 2 times
// and delay 200ms between each scheduled times
scheduler.start(200, 2);

```

<br />

### Manipulation


<br />

#### Push task at specific time
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
// and make sure scheduler has not reached new schedule time
setTimeout(function() {
    scheduler.pushStep({
        at: 4000,
        run: function() {
            console.log("Hello 4000ms");
        }
    })
}, 3000);
```

<br />

#### Stop scheduler will terminate all running tasks
```js
scheduler.stop();
```

<br />

## Finite State Machine

Inspired by [javascript-state-machine](https://github.com/jakesgordon/javascript-state-machine) (author: jakesgordon)

<br />

### Creation

NOTICE: event name must NOT be "any"

```js
var fsm = gamedev.fsm.config({
    initial: "stand",
    events: {
        move: {from: ["stand", "run"], to: "walk"},
        movefast: {from: ["stand", "walk"], to: "run"},
        stop: {from: ["walk", "run"], to: "stand"},
    }
});

console.log(fsm.current); // "stand"
fsm.events.move();
console.log(fsm.current); // "walk"
```


<br />

### Manipulation

```js
...
fsm.pushEvents({
    die: {from: ["stand", "run", "walk"], to: "dead"}
});

fsm.events.die();
```

<br />

### Event Handler

Event execution orders:
- beforeany - fired before any event
- beforeEVENT - fired before the event
- leaveSTATE - fired when leaving the old state (fsm.current is still old state)
- leaveany - fired when leaving any old state (fsm.current is still old state)
- enterany - fired when entering any new state (fsm.current is new state)
- enterSTATE - fired when entering the new state (fsm.current is new state)
- afterEVENT - fired after the event
- afterany - fired after any event

```js
...
fsm.events.beforemove = function() {
    console.log("before move");
}

fsm.events.leavestand = function() {
    console.log("leave stand");
}

fsm.events.enterwalk = function() {
    console.log("enter walk");
}

fsm.events.aftermove = function() {
    console.log("after move");
}

fsm.events.move();
```
<br />

### Cancel Event Handler
```js
var EventStatus = require("gamedevjs").EventStatus;

...
fsm.events.beforemove = function() {
    console.log("before move");
    return EventStatus.CANCEL;
}

fsm.events.move();
console.log(fsm.current); // still be "stand"
```
<br />

### Async Event Handler
```js
var EventStatus = require("gamedevjs").EventStatus;

...
fsm.events.beforemove = function(next) {
    console.log("before move");
    setTimeout(function() {
        next();
    }, 2000);
    return EventStatus.ASYNC;
}

fsm.events.move();

console.log(fsm.current); // still be "stand"

setTimeout(function() {
    console.log(fsm.current); // "walk" now
}, 3000);
```
<br />

## Object Pool

<br />

### Creation

#### Item List

Predefine a list of items for object pool.

```js
var gamedev = require("gamedevjs").gamedev;

var pool = gamedev.pool.config({
    items: [
        {point: 0}
    ]
});
```

#### Sample Item
```js
...

var pool = gamedev.pool.config({
    sampleItem: {point: 2}
    sampleCount: 2
});
```

### Combine

Predefined items are added to the pool first, then sample items will be added later.

```js

var pool = gamedev.pool.config({
    items: [
        {point: 0}
    ],
    sampleItem: {point: 2}
    sampleCount: 2
});
```

### Manipulation

#### Get
```js
...

// get available item
item = pool.getItem();

// if pool is empty, it will clone sampleItem
// if sampleItem is undefined, item2 is undefined as well
item2 = pool.getItem();
```

#### Return

```js
...
// return item to the pool and trigger onreturn event
pool.returnItem(item);
```

#### Push

```js
...
// push item to the pool and trigger onpush event
pool.pushItem(item);
```

#### Clear
Clear all items
```js
...
pool.clear();
```

### Events

- onpush: trigger when item is pushed to pool (init pool or push new items to pool)
- onget: trigger when item is retrieved from pool (get available item)
- onreturn: trigger when item is returned to pool (return item to pool)



```js
pool = gamedev.pool.config({
    onreturn: function(item) { console.log("return item"); },
    onget: function(item) { console.log("get item"); },
    onpush: function(item) { console.log("push item"); },
    sampleItem: {point: 0}
});
```

## Event Manager

### Creation
```js
var gamedev = require("gamedevjs").gamedev;
var EventManager = require("gamedevjs").EventManager;

// global event manager
var event = gamedev.event;

// or create new instance
var event = new EventManager();

```

<br />

### Manipulation

#### Common usage
```js
...
let isHit = false;
let heath = 1200;

gamedev.event.register("hit", (data) => {
  isHit = true;
  heath -= data.damage;
});

gamedev.event.emit("hit", {damage: 500});
console.log(heath); // 700

gamedev.event.unregister("hit");

gamedev.event.emit("hit", {damage: 500});
console.log(heath); // 700

```

#### Register Once
```js
let isHit = false;
let heath = 1200;

gamedev.event.registerOnce("hit", (data) => {
  isHit = true;
  heath -= data.damage;
});

gamedev.event.emit("hit", {damage: 500});
console.log(heath); // 700
gamedev.event.emit("hit", {damage: 500});
console.log(heath); // 700
```

#### Register Replace
```js
let isHit = false;
let heath = 1200;

gamedev.event.register("hit", (data) => {
  isHit = true;
  heath -= data.damage;
});

gamedev.event.register("hit", (data) => {
  isHit = true;
  heath -= data.damage * 2;
}, true); // set third parameter to true

gamedev.event.emit("hit", {damage: 500});
console.log(heath); // 200
```

#### Multiple Register
```js
let isHit = false;
let heath = 1200;

gamedev.event.register("hit", (data) => {
  isHit = true;
  heath -= data.damage;
});
gamedev.event.register("hit", (data) => {
  isHit = true;
  heath -= 200;
});

gamedev.event.emit("hit", {damage: 500});
console.log(heath); // 500
```

#### Unregister list
```js
gamedev.event.unregisterList(["hit", "death"]);
```

#### Unregister All
```js
gamedev.event.unregisterAll();
```

<br />

# License

ISC ©

# Author
[Thinh Tran](https://www.facebook.com/ththinh)

# Donation

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=A889ABEB4LBYE)
