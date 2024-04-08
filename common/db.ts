import { GeneralItem } from "@/@type/DlsiteItem.types";
import { WorkCategory } from "@/@type/WorkCategory";
import Dexie, { Table } from "dexie";

export class IndexedDBDexie extends Dexie {
    items!: Table<GeneralItem>
    workCats!: Table<WorkCategory>

    constructor() {
        super('main')
        this.version(3).stores({
            items: '&workno, sales_date',
            workCats: '&workno, *cat'
        })
    }
}

export const find = async (limit: number): Promise<GeneralItem[]> => {
    return await db.items.orderBy('sales_date').reverse().limit(limit).toArray()
}

export const db = new IndexedDBDexie();