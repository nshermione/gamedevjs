/**
 * Created by thinhtran on 5/24/17.
 */

import {gamedev} from "../src/index";

describe("gamedev.scheduler", function () {
  let value = 5;
  let scheduler;
  let sequence;

  beforeEach(function () {
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

    sequence = gamedev.scheduler.sequence([
      {
        duration: 900, run: () => {
        value = 6
      }
      },
      {
        duration: 1000, run: () => {
        value = 7
      }
      },
      {
        duration: 0, run: () => {
        value = 8
      }
      },
    ])
  });

  it("config(steps)", function (done) {
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
    scheduler.start();

    setTimeout(() => {
      scheduler.pushStep(2100, () => {
        value = 9;
      })
    }, 2090);

    setTimeout(() => {
      expect(value).toBe(9);
      done();
    }, 2101);
  });

  it("sequence(durationSteps)", function (done) {
    sequence.start(100);

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
  })
});
