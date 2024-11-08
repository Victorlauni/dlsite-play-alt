import Dexie, { Table } from 'dexie';
import { GeneralItem } from '@/@type/DlsiteItem.types';
import { WorkCategory } from '@/@type/WorkCategory';
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

const isAllCatChecked = (cats: number[]): boolean => (
    cats.length ==
    Object.keys(WORK_CATEGORY.R18.appeal)
      .concat(Object.keys(WORK_CATEGORY.R18.system))
      .concat(Object.keys(WORK_CATEGORY.R18.item))
      .concat(Object.keys(WORK_CATEGORY.R18.play))
      .concat(Object.keys(WORK_CATEGORY.R18.character))
      .concat(Object.keys(WORK_CATEGORY.R18.appearence)).length
  );

export const find = async (type: string, limit: number, offset: number): Promise<GeneralItem[]> => (await db.items.where('work_type').equals(type).reverse().sortBy('sales_date')).slice(
    offset,
    offset + limit
  );

export const getItemCount = async (): Promise<number> => {
  return await db.items.count()
}

export const filter = async (
  cat: number[],
  type: string,
  keyword: string,
  limit: number,
  offset: number
): Promise<GeneralItem[]> => (isAllCatChecked(cat) && !keyword
    ? find(type, limit, offset)
    : db.workCats
        .where('cat')
        .anyOf(...cat)
        .distinct()
        .toArray()
        .then((items) => db.items.bulkGet(items.map((work) => work.workno)))
        .then((res) =>
          Promise.resolve(
            res
              .sort((a, b) => b?.sales_date?.localeCompare(a?.sales_date!) ?? 0)
              .filter((it) => it != undefined && it.work_type === type)
              .filter((it) => it?.name?.ja_JP?.includes(keyword) ?? true)
              .slice(offset, offset + limit) as GeneralItem[]
          )
        ))
export const db = new IndexedDBDexie();
