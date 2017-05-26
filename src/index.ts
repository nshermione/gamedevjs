import {SchedulerStatic} from "./scheduler";
import {EventStatus, FiniteStateMachineStatic} from "./fsm";
import {PoolStatic} from "./pool";

export class GameDev {
  scheduler: SchedulerStatic;
  fsm: FiniteStateMachineStatic;
  pool: PoolStatic;

  constructor() {
    this.scheduler = new SchedulerStatic();
    this.fsm = new FiniteStateMachineStatic();
    this.pool = new PoolStatic();
  }
}


const gamedev = new GameDev();

export {
  gamedev,
  EventStatus
}
