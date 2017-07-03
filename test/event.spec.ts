import {gamedev} from "../src/index";

describe("event manager", function () {

  it("register and emit", function () {
    let isHit = false;
    let damage = 0;
    gamedev.event.register("hit", (data) => {
      isHit = true;
      damage = data.damage;
    });

    gamedev.event.emit("hit", {damage: 500});

    expect(isHit).toBe(true);
    expect(damage).toBe(500);
  });

  it("register replace", function () {
    let isHit = false;
    let damage = 0;
    gamedev.event.register("hit", (data) => {
      isHit = false;
      damage = data.damage;
    });

    gamedev.event.register("hit", (data) => {
      isHit = true;
      damage = 700;
    }, true);

    gamedev.event.emit("hit", {damage: 500});
    expect(isHit).toBe(true);
    expect(damage).toBe(700);

  });

  it("multiple register", function () {
    let isHit = false;
    let damage = 0;
    gamedev.event.register("hit", (data) => {
      isHit = false;
      damage += data.damage;
    });

    gamedev.event.register("hit", (data) => {
      isHit = true;
      damage += 700;
    });

    gamedev.event.emit("hit", {damage: 500});
    expect(isHit).toBe(true);
    expect(damage).toBe(1200);
  });

  it("register once", function () {
    let isHit = false;
    let damage = 0;
    gamedev.event.registerOnce("hit", (data) => {
      isHit = true;
      damage = data.damage;
    });

    gamedev.event.emit("hit", {damage: 500});
    gamedev.event.emit("hit", {damage: 700});
    expect(isHit).toBe(true);
    expect(damage).toBe(500);
  });

  it("register once replace", function () {
    let isHit = false;
    let damage = 0;
    gamedev.event.registerOnce("hit", (data) => {
      isHit = false;
      damage = data.damage;
    });
    gamedev.event.registerOnce("hit", (data) => {
      isHit = true;
      damage = 700;
    }, true);

    gamedev.event.emit("hit", {damage: 500});
    gamedev.event.emit("hit", {damage: 800});
    expect(isHit).toBe(true);
    expect(damage).toBe(700);
  });

  it("unregister", function () {
    let isHit = false;
    let damage = 0;
    gamedev.event.register("hit", (data) => {
      isHit = true;
      damage = data.damage;
    });

    gamedev.event.unregister("hit");

    gamedev.event.emit("hit", {damage: 500});

    expect(isHit).toBe(false);
    expect(damage).toBe(0);
  });

  it("unregisterAll", function () {
    let isHit = false;
    let damage = 0;
    let level = 0;
    gamedev.event.register("hit", (data) => {
      isHit = true;
      damage = data.damage;
    });

    gamedev.event.register("levelup", (data) => {
      level = 1;
    });

    gamedev.event.unregisterAll();

    gamedev.event.emit("hit", {damage: 500});
    gamedev.event.emit("levelup");

    expect(isHit).toBe(false);
    expect(damage).toBe(0);
    expect(level).toBe(0);
  });

  it("unregisterCallback", function () {
    let isHit = false;
    let damage = 0;

    let hitCB = (data) => {
      isHit = true;
      damage = data.damage;
    };

    gamedev.event.register("hit", hitCB);

    gamedev.event.unregisterCallback("hit", hitCB);

    gamedev.event.emit("hit", {damage: 500});

    expect(isHit).toBe(false);
    expect(damage).toBe(0);
  });
});