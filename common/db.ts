import { GeneralItem } from '@/@type/DlsiteItem.types';
import { WorkCategory } from '@/@type/WorkCategory';
import Dexie, { Table } from 'dexie';
import { WORK_CATEGORY } from './const';

export class IndexedDBDexie extends Dexie {
  items!: Table<GeneralItem>;
  workCats!: Table<WorkCategory>;

  constructor() {
    super('main');
    this.version(5).stores({
      items: '&workno, sales_date, app_type, work_type',
      workCats: '&workno, *cat',
    });
  }
}

const isAllCatChecked = (cats: number[]): boolean => {
  return (
    cats.length ==
    Object.keys(WORK_CATEGORY.R18.appeal)
      .concat(Object.keys(WORK_CATEGORY.R18.system))
      .concat(Object.keys(WORK_CATEGORY.R18.item))
      .concat(Object.keys(WORK_CATEGORY.R18.play))
      .concat(Object.keys(WORK_CATEGORY.R18.character))
      .concat(Object.keys(WORK_CATEGORY.R18.appearence)).length
  );
};

export const find = async (type: string, limit: number, offset: number): Promise<GeneralItem[]> => {
  return (await db.items.where('work_type').equals(type).reverse().sortBy('sales_date')).slice(
    offset,
    offset + limit
  );
};

export const filter = async (
  cat: number[],
  type: string,
  limit: number,
  offset: number
): Promise<GeneralItem[]> => {
  return isAllCatChecked(cat)
    ? await find(type, limit, offset)
    : await db.workCats
        .where('cat')
        .anyOf(...cat)
        .distinct()
        .offset(offset)
        .limit(limit)
        .reverse()
        .sortBy('sales_date')
        .then((items) => db.items.bulkGet(items.map((work) => work.workno)))
        .then((res) =>
          Promise.resolve(
            res.filter((it) => it != undefined && it.work_type === type) as GeneralItem[]
          )
        );
};

export const db = new IndexedDBDexie();
