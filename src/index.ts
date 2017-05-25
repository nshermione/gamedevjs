import {SchedulerStatic} from "./scheduler";
import {EventStatus, FiniteStateMachineStatic} from "./fsm";

export class GameDev {
  scheduler: SchedulerStatic;
  fsm: FiniteStateMachineStatic;

  constructor() {
    this.scheduler = new SchedulerStatic();
    this.fsm = new FiniteStateMachineStatic();
  }
}


const gamedev = new GameDev();
export {
  gamedev,
  EventStatus
}
