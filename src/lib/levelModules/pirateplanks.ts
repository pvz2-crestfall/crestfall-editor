import type { PiratePlankProperties } from '@/types/PVZTypes';
import { PVZBase } from './base';

export type PiratePlankRows = [boolean, boolean, boolean, boolean, boolean];

export class PiratePlanks extends PVZBase {
    static objclass: string = 'PiratePlankProperties';
    aliases: string[] = ['PiratePlanks'];
    objdata: PiratePlankProperties;
    enabled?: boolean = false;

    constructor(propertiesObject: PiratePlankProperties) {
        super();
        this.objdata = propertiesObject;
    }

    set rows(rows: PiratePlankRows) {
        let newRows = [];
        for (const [index, row] of rows.entries()) {
            if (row == true) {
                newRows.push(index);
            }
        }
        this.objdata.PlankRows = newRows;
    }

    get rows(): PiratePlankRows {
        let rows: PiratePlankRows = [false, false, false, false, false];
        for (const rowIndex of this.objdata.PlankRows) {
            rows[rowIndex] = true;
        }
        return rows;
    }
}
