/**
 * Created by thinhth2 on 5/26/2017.
 */

export class EventManager {

  events = {};
  onceList = [];

  emit(name, ...data) {
    let events = this.events[name];
    if (!events) return;

    for (let event of events) {
      event.apply(null, data);
      if (this.onceList.indexOf(name) >= 0) {
        this.unregister(name);
      }
    }
  }

  register(name, callback, replace=false) {
    if (!this.events[name] || replace) {
      this.events[name] = [];
    }

    this.events[name].push(callback);
  }

  registerOnce(name, callback, replace=false) {
    this.register(name, callback, replace);
    if (this.onceList.indexOf(name) < 0) {
      this.onceList.push(name);
    }
  }

  unregister(name) {
    this.events[name] = [];
  }

  unregisterList(names) {
    for (let name of names) {
      this.unregister(name);
    }
  }

  unregisterCallback(name, callback) {
    let events = this.events[name];
    if (events) {
      for (let i = 0; i < events.length; i++) {
        let event = events[i]
        if (event === callback) {
          events.splice(i, 1);
          break;
        }
      }
    }
  }

  unregisterAll() {
    this.events = {};
    this.onceList = [];
  }
}