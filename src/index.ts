import {SchedulerStatic} from "./scheduler";
import {FiniteStateMachineStatic} from "./fsm";

export class GameDev {
  scheduler: SchedulerStatic;
  fsm: FiniteStateMachineStatic;

  constructor() {
    this.scheduler = new SchedulerStatic();
    this.fsm = new FiniteStateMachineStatic();
  }
}


export const gamedev = new GameDev();
