/**
 * Created by thinhtran on 5/24/17.
 */

/**
 * Scheduler helps to call function with specific time and flexible configuration.
 */
export class Scheduler {
  endTime = 0;
  steps = [];
  startTime = 0;
  isRunning = false;
  timeouts = [];
  delay = 0;
  repeat = 0;

  constructor() {

  }

  /**
   *
   * @param delay milliseconds
   * @param repeat integer
   */
  public start(delay = 0, repeat = 0) {
    this.stop();
    this.delay = delay !== undefined ? delay : this.delay;
    this.repeat = repeat !== undefined ? repeat : this.repeat;
    this.isRunning = true;
    this.endTime = 0;
    for (let step of this.steps) {
      let timeout = setTimeout(() => {
        if (this.isRunning) {
          step.run();
        }
      }, this.delay + step.at);

      let duration = step.duration || 0;
      this.endTime = Math.max(this.endTime, this.delay + step.at + duration);
      this.timeouts.push(timeout);
    }

    this.scheduleEndStep();

    this.startTime = Date.now();
  }

  private scheduleEndStep() {
    let timeout = setTimeout(() => {
      this.repeat = this.repeat > 0 ? this.repeat - 1 : this.repeat;
      if (this.repeat > 0 || this.repeat === -1) {
        this.start();
      } else {
        this.stop();
      }
    }, this.endTime + 1);
    this.timeouts.push(timeout);
  }

  /**
   * Stop all scheduled steps
   */
  public stop(clean = true) {
    this.isRunning = false;
    if (clean) {
      for (let timeout of this.timeouts) {
        clearTimeout(timeout);
      }
    }
    this.timeouts = [];
    this.startTime = 0;
  }

  /**
   *
   * @param at - starting time (make sure: at - elapsed >= 10ms, which elapsed is elapsed time from starting)
   * @param run - executive function
   */
  public pushStep(at, run): void {
    let step = {at, run};
    this.steps.push(step);
    this.scheduleNewStep(step);
  }

  private scheduleNewStep(step): void {
    let elapsed = Date.now() - this.startTime;
    if (step.at > elapsed) {
      let timeout = setTimeout(step.run, step.at - elapsed);
      this.timeouts.push(timeout);

      let duration = step.duration || 0;
      let endTime = step.at - elapsed + duration;
      if (step.at > this.endTime) {
        if (this.timeouts.length > 1) {
          let endtimeout = this.timeouts.slice(this.timeouts.length - 2, this.timeouts.length - 1)[0];
          clearTimeout(endtimeout);
        }
        this.endTime = endTime;
        this.scheduleEndStep();
      }
    }
  }

  public pushSteps(steps): void {
    if (steps && steps.length) {
      this.steps = this.steps.concat(steps);
      for (let step of steps) {
        this.scheduleNewStep(step);
      }
    }
  }

  public pushDurationSteps(durationSteps): void {
    let totalTime = 0;
    for (let durationStep of durationSteps) {
      let step = {at: totalTime, run: durationStep.run}
      totalTime += durationStep.duration;
      this.steps.push(step);
      this.scheduleNewStep(step);
    }
  }
}

export class SchedulerStatic {

  /**
   * Create new schedule with initial steps
   * @param steps - Syntax: [{at: <time at milliseconds>, run: <executive function>}, ...]
   * @returns Scheduler
   */
  public config(steps): Scheduler {
    let scheduler = new Scheduler();
    scheduler.pushSteps(steps);
    return scheduler;
  }

  /**
   *
   * @param durationSteps - Syntax: [{duration: <time at milliseconds>, run: <executive function>}, ...]
   * @returns {Scheduler}
   */
  public sequence(durationSteps): Scheduler {
    let scheduler = new Scheduler();
    scheduler.pushDurationSteps(durationSteps);
    return scheduler;
  }
}