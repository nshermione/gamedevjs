import {gamedev} from "../src/index";
import {FiniteStateMachine, EventStatus} from "../src/fsm";

describe("gamedev.fsm", function () {
  let fsm: FiniteStateMachine;

  function initFSM() {
    fsm = gamedev.fsm.config({
      initial: "stand",
      events: {
        move: {from: ["stand", "run"], to: "walk"},
        movefast: {from: ["stand", "walk"], to: "run"},
        stop: {from: ["walk", "run"], to: "stand"},
      }

    });
  }

  it("config(options)", function (done) {
    initFSM();

    fsm.events.beforemove = () => {
      expect(fsm.current).toBe("stand");
    };

    fsm.events.aftermove = () => {
      expect(fsm.current).toBe("walk");
      done();
    };

    fsm.events.leavestand = () => {
      expect(fsm.current).toBe("stand");
    };

    fsm.events.enterwalk = () => {
      expect(fsm.current).toBe("walk");
    };

    fsm.events.move();

    expect(fsm.current).toBe("walk");
  });

  it("cancel event", function () {
    initFSM();

    fsm.events.beforemove = () => {
      expect(fsm.current).toBe("stand");
      return EventStatus.CANCEL;
    };

    fsm.events.move();

    expect(fsm.current).toBe("stand");
  });

  it("async event", function(done) {
    initFSM();

    fsm.events.beforemove = (next) => {
      expect(fsm.current).toBe("stand");
      setTimeout(() => {
        next();
      }, 1000);
      return EventStatus.ASYNC;
    };

    fsm.events.move();

    expect(fsm.current).toBe("stand");

    setTimeout(() => {
      expect(fsm.current).toBe("stand");
    }, 900);

    setTimeout(() => {
      expect(fsm.current).toBe("walk");
      done();
    }, 2000);
  });
});