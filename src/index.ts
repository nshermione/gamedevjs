import {SchedulerStatic} from "./scheduler";

export class GameDev {
  scheduler: SchedulerStatic;

  constructor() {
    this.scheduler = new SchedulerStatic();
  }
}


const gamedev = new GameDev();

export default gamedev;