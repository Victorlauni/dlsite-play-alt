import Dexie, { Table } from 'dexie';

export interface DlsiteWorkDb {
  id: string;
  raw: any;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  friends!: Table<DlsiteWorkDb>;

  constructor() {
    super('dlplaydb');
    this.version(1).stores({
      friends: '++id' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();