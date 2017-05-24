import {SchedulerStatic} from "./scheduler";

export class GameDev {
  scheduler: SchedulerStatic;

  constructor() {
    this.scheduler = new SchedulerStatic();
  }
}


export const gamedev = new GameDev();
