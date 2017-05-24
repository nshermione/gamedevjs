/**
 * Created by thinhtran on 5/24/17.
 */


import {SchedulerStatic} from "./scheduler";


class GameDev {
  constructor() {
    this.scheduler = new SchedulerStatic();

  }
}


const gamedev = new GameDev();

export  {
  gamedev
}