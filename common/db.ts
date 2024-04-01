import { GeneralItem } from "@/@type/DlsiteItem.types";
import Dexie, { Table } from "dexie";

export class IndexedDBDexie extends Dexie {
    items!: Table<GeneralItem>

    constructor() {
        super('main')
        this.version(1).stores({
            items: '&workno'
        })
    }
}

export const find = async (limit: number): Promise<GeneralItem[]> => {
    return await db.items.limit(limit).toArray()
}

export const db = new IndexedDBDexie();