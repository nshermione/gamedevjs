/**
 * Created by thinhtran on 5/24/17.
 */

import {gamedev} from "../src/index";

describe("gamedev.scheduler", function () {
  let value = 5;
  let sequenceValue = 5;
  let repeatValue = 5;
  let scheduler;
  let sequence;
  let repeat;

  let initSchedule = function () {
    scheduler = gamedev.scheduler.config([
      {
        at: 100, run: () => {
        value = 6
      }
      },
      {
        at: 1000, run: () => {
        value = 7
      }
      },
      {
        at: 2000, run: () => {
        value = 8
      }
      },
    ]);
  };

  let initSequence = function () {
    sequence = gamedev.scheduler.sequence([
      {
        duration: 900, run: () => {
        sequenceValue = 6
      }
      },
      {
        duration: 1000, run: () => {
        sequenceValue = 7
      }
      },
      {
        duration: 0, run: () => {
        sequenceValue = 8
      }
      },
    ]);
  };

  let initRepeat = function () {
    repeat = gamedev.scheduler.config([
      {
        at: 100, run: () => {
        repeatValue = 6
      }
      },
      {
        at: 1000, run: () => {
        repeatValue = 7
      }
      },
      {
        at: 2000, run: () => {
        repeatValue = 8
      }
      },
    ]);
  };

  beforeEach(function () {
  });

  it("config(steps)", function (done) {
    initSchedule();

    scheduler.start();

    expect(scheduler.steps.length).toBe(3);
    expect(value).toBe(5);

    setTimeout(() => {
      expect(value).toBe(6);
    }, 900);

    setTimeout(() => {
      expect(value).toBe(7);
    }, 1100);

    setTimeout(() => {
      expect(value).toBe(8);
      done();
    }, 2001);
  });

  it("pushStep", function (done) {
    initSchedule();
    scheduler.start();

    setTimeout(() => {
      scheduler.pushStep(2100, () => {
        value = 9;
      })
    }, 2000);

    setTimeout(() => {
      expect(value).toBe(9);
      done();
    }, 2101);
  });

  it("sequence(durationSteps)", function (done) {
    initSequence();

    sequence.start(100);

    setTimeout(() => {
      expect(sequenceValue).toBe(6);
    }, 900);

    setTimeout(() => {
      expect(sequenceValue).toBe(7);
    }, 1100);

    setTimeout(() => {
      expect(sequenceValue).toBe(8);
      done();
    }, 2001);
  });

  it("play(delay=0, repeat=2)", function (done) {
    initRepeat();

    repeat.start(200, 2);

    setTimeout(() => {
      expect(repeatValue).toBe(6);
    }, 900 + 200);

    setTimeout(() => {
      expect(repeatValue).toBe(7);
    }, 1100 + 200);

    setTimeout(() => {
      expect(repeatValue).toBe(8);
    }, 2001 + 200);

    setTimeout(() => {
      expect(repeatValue).toBe(8);
    }, 2099 + 200);

    setTimeout(() => {
      expect(repeatValue).toBe(6);
      done();
    }, 2110 + 200 + 200);

  });
});
