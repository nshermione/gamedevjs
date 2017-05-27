import {SchedulerStatic} from "./scheduler";
import {EventStatus, FiniteStateMachineStatic} from "./fsm";
import {PoolStatic} from "./pool";
import {EventManager} from "./event";

export class GameDev {
  scheduler: SchedulerStatic;
  fsm: FiniteStateMachineStatic;
  pool: PoolStatic;
  event: EventManager;

  constructor() {
    this.scheduler = new SchedulerStatic();
    this.fsm = new FiniteStateMachineStatic();
    this.pool = new PoolStatic();
    this.event = new EventManager();
  }
}


const gamedev = new GameDev();

const gamedevjs = {
  gamedev: gamedev,
  EventStatus: EventStatus,
  EventManager: EventManager
};

if (window) {
  (<any>window).gamedevjs = gamedevjs;
}

export {
  gamedev,
  EventStatus,
  EventManager
}
