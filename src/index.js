/**
 * Created by thinhtran on 5/24/17.
 */


import {Scheduler} from "./scheduler";


class GameDev {
  constructor() {
    this.scheduler = new Scheduler();

  }
}


const gamedev = new GameDev();

export  {
  gamedev
}