import {gamedev} from "../src/index";
import {Pool} from "../src/pool";

describe("pool", function () {
  let pool: Pool;
  let samplePool: Pool;

  function initPool() {
    let items = [];
    for (let i = 0; i < 3; i++) {
      items.push({point: 0, reset: function() {this.point = 0}});
    }

    pool = gamedev.pool.config({
      onreturn: (item) => {item.reset()},
      onget: (item) => {},
      items: items
    });
  }

  function initSamplePool() {
    samplePool = gamedev.pool.config({
      onreturn: (item) => {item.reset()},
      onget: (item) => {},
      sampleItem: {point: 0, reset: function() {this.point = 0}},
      sampleCount: 3
    });
  }

  it("samplePool", function () {
    initSamplePool();
    let item = samplePool.getItem();
    expect(item).toBeDefined();
    expect(item.point).toBe(0);
  });

  it("getItem", function () {
    initPool();

    let item = pool.getItem();
    expect(item).toBeDefined();
    expect(item.point).toBe(0);

    pool.getItem();
    pool.getItem();
    item = pool.getItem();
    expect(item).toBeUndefined();
  });

  it("clear", function () {
    initPool();
    pool.clear();
    let item = pool.getItem();
    expect(item).toBeUndefined();
  });

  it("returnItem", function () {
    initPool();
    let item = pool.getItem();
    expect(item.__alive).toBe(true);
    pool.returnItem(item);
    expect(item.__alive).toBe(false);
  });

  it("pushItem", function () {
    initPool();
    pool.clear();
    pool.pushItem({point: 20});
    let item = pool.getItem();
    expect(item).toBeDefined();
    expect(item.point).toBe(20);
  });

});