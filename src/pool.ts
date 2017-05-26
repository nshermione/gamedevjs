/**
 * Created by thinhth2 on 5/26/2017.
 */

export interface PoolItem {
  __alive?: boolean;
  [name:string]: any;
}

export class Pool {
  items: Array<PoolItem> = [];
  onreturn: any;
  onget: any;
  onpush: any;
  sample: any;

  constructor() {

  }

  private cloneItem(sample: PoolItem) {
    if (sample) {
      return {...sample};
    }
  }

  public getItem(): PoolItem {
    let item = this.items.shift();
    if (!item && this.sample) {
      item = this.cloneItem(this.sample);
    }
    if (item) {
      item.__alive = true;
      this.onget(item);
      return item;
    }
  }

  public pushItem(item: PoolItem) {
    item.__alive = false;
    this.onpush(item);
    this.items.push(item);
  }

  public setItems(items: Array<PoolItem>) {
    this.items = items;
  }

  public clear() {
    this.items = [];
  }

  public returnItem(item: PoolItem) {
    item.__alive = false;
    this.onreturn(item);
    this.items.push(item);
  }

  /**
   * Generate <sampleCount> of sample items
   * @param sampleItem
   * @param sampleCount
   */
  public generateItems(sampleItem: PoolItem, sampleCount: number) {
    this.sample = sampleItem;
    if (sampleItem && sampleCount) {
      for (let i = 0; i < sampleCount; i++) {
        let clone = this.cloneItem(this.sample);
        this.items.push(clone);
      }
    }
  }
}

export interface PoolOption {
  onreturn?: Function;
  onget?: Function;
  onpush?: Function;
  items?: Array<PoolItem>;
  sampleItem?: PoolItem;
  sampleCount?: number;
}

export class PoolStatic {
  public config(options: PoolOption) {
    let pool = new Pool;
    pool.onreturn = options.onreturn || (() => {});
    pool.onget = options.onget || (() => {});
    pool.onpush = options.onpush || (() => {});
    pool.setItems(options.items || []);
    pool.generateItems(options.sampleItem, options.sampleCount);
    return pool;
  }
}