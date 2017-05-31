/**
 * Created by thinhth2 on 5/25/2017.
 */

export interface IStateEvent {
  [name:string]: {from: any, to: any};
}

export const EventStatus = {
  ASYNC: "async",
  CANCEL: "cancel",
  CONTINUE: "continue"
};

export interface IStateOption {
  initial: any;
  events: IStateEvent;
}

export class FiniteStateMachine {
  events: any = {};
  current: any = "";
  previous: any = "";

  constructor() {

  }

  public setInitState(initState) {
    this.current = initState;
    this.previous = initState;
  }

  public registerEvent(name, callback, self) {
    this.events[name] =  callback;
    this.events[name + "_self"] = self;
  }

  private runEvent(prefix, name, done) {
    if (this.events[`${prefix}${name}`] && this.events[`${prefix}${name}`].call) {
      return this.events[`${prefix}${name}`].call(this.events[`${prefix}${name}_self`], done);
    }
  }

  private processEvent(steps) {
    let step = steps.shift();
    let isAsycn = true;
    let doneCalled = false;
    let done = () => {
      if (isAsycn) {
        this.processEvent(steps);
        doneCalled = true;
      }
    };

    if (step) {
      let status = step(done);
      switch (status) {
        case EventStatus.CANCEL:
          isAsycn = false;
          break;
        case EventStatus.ASYNC:
          break;
        default:
          isAsycn = false;
          if (!doneCalled) {
            this.processEvent(steps);
          }
          break;
      }
    }
  }

  public pushEvents(events: IStateEvent) {
    for (let name in events) {
      if (events.hasOwnProperty(name)) {
        let event = events[name];
        this.events[name] = () => {
          if (this.current === event.from || event.from.indexOf(this.current) >= 0) {
            this.processEvent([
              (done)=>{return this.runEvent("before", "any", done)},
              (done)=>{return this.runEvent("before", name, done)},
              (done)=>{return this.runEvent("leave", this.current, done)},
              (done)=>{return this.runEvent("leave", "any", done)},
              (done)=>{
                this.previous = this.current;
                this.current = event.to;
                done();
              },
              (done)=>{return this.runEvent("enter", "any", done)},
              (done)=>{return this.runEvent("enter", this.current, done)},
              (done)=>{return this.runEvent("after", name, done)},
              (done)=>{return this.runEvent("after", "any", done)},
            ]);
          }
        };
      }
    }
  }
}

export class FiniteStateMachineStatic {
  public config(options: IStateOption): FiniteStateMachine {
    let fsm = new FiniteStateMachine();
    fsm.setInitState(options.initial || "");
    fsm.pushEvents(options.events || {});
    return fsm;
  }
}