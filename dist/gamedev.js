(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gamedevjs"] = factory();
	else
		root["gamedevjs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by thinhth2 on 5/26/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var EventManager = (function () {
    function EventManager() {
        this.events = {};
        this.onceList = [];
    }
    EventManager.prototype.emit = function (name) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        var events = this.events[name];
        if (!events)
            return;
        for (var _a = 0, events_1 = events; _a < events_1.length; _a++) {
            var event_1 = events_1[_a];
            event_1.apply(event_1, data);
            if (this.onceList.indexOf(name) >= 0) {
                this.unregister(name);
            }
        }
    };
    EventManager.prototype.register = function (name, callback, replace) {
        if (replace === void 0) { replace = false; }
        if (!this.events[name] || replace) {
            this.events[name] = [];
        }
        this.events[name].push(callback);
    };
    EventManager.prototype.registerOnce = function (name, callback, replace) {
        if (replace === void 0) { replace = false; }
        this.register(name, callback, replace);
        if (this.onceList.indexOf(name) < 0) {
            this.onceList.push(name);
        }
    };
    EventManager.prototype.unregister = function (name) {
        this.events[name] = [];
    };
    EventManager.prototype.unregisterList = function (names) {
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            this.unregister(name_1);
        }
    };
    EventManager.prototype.unregisterCallback = function (name, callback) {
        var events = this.events[name];
        if (events) {
            for (var i = 0; i < events.length; i++) {
                if (event === callback) {
                    events.splice(i, 1);
                    break;
                }
            }
        }
    };
    EventManager.prototype.unregisterAll = function () {
        this.events = {};
        this.onceList = [];
    };
    return EventManager;
}());
exports.EventManager = EventManager;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by thinhth2 on 5/25/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStatus = {
    ASYNC: "async",
    CANCEL: "cancel",
    CONTINUE: "continue"
};
var FiniteStateMachine = (function () {
    function FiniteStateMachine() {
        this.events = {};
        this.current = "";
    }
    FiniteStateMachine.prototype.setInitState = function (initState) {
        this.current = initState;
    };
    FiniteStateMachine.prototype.runEvent = function (prefix, name, done) {
        if (this.events["" + prefix + name] && this.events["" + prefix + name].call) {
            return this.events["" + prefix + name](done);
        }
    };
    FiniteStateMachine.prototype.processEvent = function (steps) {
        var _this = this;
        var step = steps.shift();
        var isAsycn = true;
        var doneCalled = false;
        var done = function () {
            if (isAsycn) {
                _this.processEvent(steps);
                doneCalled = true;
            }
        };
        if (step) {
            var status_1 = step(done);
            switch (status_1) {
                case exports.EventStatus.CANCEL:
                    isAsycn = false;
                    break;
                case exports.EventStatus.ASYNC:
                    break;
                default:
                    isAsycn = false;
                    if (!doneCalled) {
                        this.processEvent(steps);
                    }
                    break;
            }
        }
    };
    FiniteStateMachine.prototype.pushEvents = function (events) {
        var _this = this;
        var _loop_1 = function (name_1) {
            if (events.hasOwnProperty(name_1)) {
                var event_1 = events[name_1];
                this_1.events[name_1] = function () {
                    if (_this.current === event_1.from || event_1.from.indexOf(_this.current) >= 0) {
                        _this.processEvent([
                            function (done) { return _this.runEvent("before", "any", done); },
                            function (done) { return _this.runEvent("before", name_1, done); },
                            function (done) { return _this.runEvent("leave", _this.current, done); },
                            function (done) { return _this.runEvent("leave", "any", done); },
                            function (done) { _this.current = event_1.to; done(); },
                            function (done) { return _this.runEvent("enter", "any", done); },
                            function (done) { return _this.runEvent("enter", _this.current, done); },
                            function (done) { return _this.runEvent("after", name_1, done); },
                            function (done) { return _this.runEvent("after", "any", done); },
                        ]);
                    }
                };
            }
        };
        var this_1 = this;
        for (var name_1 in events) {
            _loop_1(name_1);
        }
    };
    return FiniteStateMachine;
}());
exports.FiniteStateMachine = FiniteStateMachine;
var FiniteStateMachineStatic = (function () {
    function FiniteStateMachineStatic() {
    }
    FiniteStateMachineStatic.prototype.config = function (options) {
        var fsm = new FiniteStateMachine();
        fsm.setInitState(options.initial || "");
        fsm.pushEvents(options.events || {});
        return fsm;
    };
    return FiniteStateMachineStatic;
}());
exports.FiniteStateMachineStatic = FiniteStateMachineStatic;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by thinhth2 on 5/26/2017.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Pool = (function () {
    function Pool() {
        this.items = [];
    }
    Pool.prototype.cloneItem = function (sample) {
        if (sample) {
            return __assign({}, sample);
        }
    };
    Pool.prototype.getItem = function () {
        var item = this.items.shift();
        if (!item && this.sample) {
            item = this.cloneItem(this.sample);
        }
        if (item) {
            item.__alive = true;
            this.onget(item);
            return item;
        }
    };
    Pool.prototype.pushItem = function (item) {
        item.__alive = false;
        this.onpush(item);
        this.items.push(item);
    };
    Pool.prototype.setItems = function (items) {
        this.items = items;
    };
    Pool.prototype.clear = function () {
        this.items = [];
    };
    Pool.prototype.returnItem = function (item) {
        item.__alive = false;
        this.onreturn(item);
        this.items.push(item);
    };
    /**
     * Generate <sampleCount> of sample items
     * @param sampleItem
     * @param sampleCount
     */
    Pool.prototype.generateItems = function (sampleItem, sampleCount) {
        this.sample = sampleItem;
        if (sampleItem && sampleCount) {
            for (var i = 0; i < sampleCount; i++) {
                var clone = this.cloneItem(this.sample);
                this.items.push(clone);
            }
        }
    };
    return Pool;
}());
exports.Pool = Pool;
var PoolStatic = (function () {
    function PoolStatic() {
    }
    PoolStatic.prototype.config = function (options) {
        var pool = new Pool;
        pool.onreturn = options.onreturn || (function () { });
        pool.onget = options.onget || (function () { });
        pool.onpush = options.onpush || (function () { });
        pool.setItems(options.items || []);
        pool.generateItems(options.sampleItem, options.sampleCount);
        return pool;
    };
    return PoolStatic;
}());
exports.PoolStatic = PoolStatic;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by thinhtran on 5/24/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Scheduler helps to call function with specific time and flexible configuration.
 */
var Scheduler = (function () {
    function Scheduler() {
        this.endTime = 0;
        this.steps = [];
        this.startTime = 0;
        this.isRunning = false;
        this.timeouts = [];
        this.delay = 0;
        this.repeat = 0;
    }
    /**
     *
     * @param delay milliseconds
     * @param repeat integer
     */
    Scheduler.prototype.start = function (delay, repeat) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (repeat === void 0) { repeat = 0; }
        this.stop();
        this.delay = delay !== undefined ? delay : this.delay;
        this.repeat = repeat !== undefined ? repeat : this.repeat;
        this.isRunning = true;
        this.endTime = 0;
        var _loop_1 = function (step) {
            var timeout = setTimeout(function () {
                if (_this.isRunning) {
                    step.run();
                }
            }, this_1.delay + step.at);
            var duration = step.duration || 0;
            this_1.endTime = Math.max(this_1.endTime, this_1.delay + step.at + duration);
            this_1.timeouts.push(timeout);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.steps; _i < _a.length; _i++) {
            var step = _a[_i];
            _loop_1(step);
        }
        this.scheduleEndStep();
        this.startTime = Date.now();
    };
    Scheduler.prototype.scheduleEndStep = function () {
        var _this = this;
        var timeout = setTimeout(function () {
            _this.repeat = _this.repeat > 0 ? _this.repeat - 1 : _this.repeat;
            if (_this.repeat > 0 || _this.repeat === -1) {
                _this.start();
            }
            else {
                _this.stop();
            }
        }, this.endTime + 1);
        this.timeouts.push(timeout);
    };
    /**
     * Stop all scheduled steps
     */
    Scheduler.prototype.stop = function (clean) {
        if (clean === void 0) { clean = true; }
        this.isRunning = false;
        if (clean) {
            for (var _i = 0, _a = this.timeouts; _i < _a.length; _i++) {
                var timeout = _a[_i];
                clearTimeout(timeout);
            }
        }
        this.timeouts = [];
        this.startTime = 0;
    };
    /**
     *
     * @param at - starting time (make sure: at - elapsed >= 10ms, which elapsed is elapsed time from starting)
     * @param run - executive function
     */
    Scheduler.prototype.pushStep = function (at, run) {
        var step = { at: at, run: run };
        this.steps.push(step);
        this.scheduleNewStep(step);
    };
    Scheduler.prototype.scheduleNewStep = function (step) {
        var elapsed = Date.now() - this.startTime;
        if (step.at > elapsed) {
            var timeout = setTimeout(step.run, step.at - elapsed);
            this.timeouts.push(timeout);
            var duration = step.duration || 0;
            var endTime = step.at - elapsed + duration;
            if (step.at > this.endTime) {
                if (this.timeouts.length > 1) {
                    var endtimeout = this.timeouts.splice(this.timeouts.length - 2, 1)[0];
                    clearTimeout(endtimeout);
                }
                this.endTime = endTime;
                this.scheduleEndStep();
            }
        }
    };
    Scheduler.prototype.pushSteps = function (steps) {
        if (steps && steps.length) {
            this.steps = this.steps.concat(steps);
            for (var _i = 0, steps_1 = steps; _i < steps_1.length; _i++) {
                var step = steps_1[_i];
                this.scheduleNewStep(step);
            }
        }
    };
    Scheduler.prototype.pushDurationSteps = function (durationSteps) {
        var totalTime = 0;
        for (var _i = 0, durationSteps_1 = durationSteps; _i < durationSteps_1.length; _i++) {
            var durationStep = durationSteps_1[_i];
            var step = { at: totalTime, run: durationStep.run };
            totalTime += durationStep.duration;
            this.steps.push(step);
            this.scheduleNewStep(step);
        }
    };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
var SchedulerStatic = (function () {
    function SchedulerStatic() {
    }
    /**
     * Create new schedule with initial steps
     * @param steps - Syntax: [{at: <time at milliseconds>, run: <executive function>}, ...]
     * @returns Scheduler
     */
    SchedulerStatic.prototype.config = function (steps) {
        var scheduler = new Scheduler();
        scheduler.pushSteps(steps);
        return scheduler;
    };
    /**
     *
     * @param durationSteps - Syntax: [{duration: <time at milliseconds>, run: <executive function>}, ...]
     * @returns {Scheduler}
     */
    SchedulerStatic.prototype.sequence = function (durationSteps) {
        var scheduler = new Scheduler();
        scheduler.pushDurationSteps(durationSteps);
        return scheduler;
    };
    return SchedulerStatic;
}());
exports.SchedulerStatic = SchedulerStatic;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var scheduler_1 = __webpack_require__(3);
var fsm_1 = __webpack_require__(1);
exports.EventStatus = fsm_1.EventStatus;
var pool_1 = __webpack_require__(2);
var event_1 = __webpack_require__(0);
exports.EventManager = event_1.EventManager;
var GameDev = (function () {
    function GameDev() {
        this.scheduler = new scheduler_1.SchedulerStatic();
        this.fsm = new fsm_1.FiniteStateMachineStatic();
        this.pool = new pool_1.PoolStatic();
        this.event = new event_1.EventManager();
    }
    return GameDev;
}());
exports.GameDev = GameDev;
var gamedev = new GameDev();
exports.gamedev = gamedev;
var gamedevjs = {
    gamedev: gamedev,
    EventStatus: fsm_1.EventStatus,
    EventManager: event_1.EventManager
};
if (window) {
    window.gamedevjs = gamedevjs;
}


/***/ })
/******/ ]);
});