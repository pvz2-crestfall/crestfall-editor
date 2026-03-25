import type { PVZObject, RailcartProperties } from '@/types/PVZTypes';
import { PVZBase } from './base';

export class Railcarts extends PVZBase {
    static objclass: string = 'RailcartProperties';
    aliases: string[] = ['Railcarts'];
    objdata: RailcartProperties;

    railGrid: boolean[][];

    constructor(propertiesObject: RailcartProperties) {
        super();
        this.objdata = propertiesObject;

        // map the objdata rails to our rail grid as tiles
        this.railGrid = Array.from({ length: 9 }, () => Array.from({ length: 5 }, () => false));
        for (const rail of this.objdata.Rails) {
            for (let i = rail.RowStart; i <= rail.RowEnd; i++) {
                this.railGrid[rail.Column][i] = true;
            }
        }
    }

    buildObject<T = unknown>(): PVZObject<T> {
        // convert our tile grid into the appropriate format
        const rails: RailcartProperties['Rails'] = [];

        for (let col = 0; col < 9; col++) {
            let row = 0;

            while (row < 5) {
                // skip false tiles
                if (!this.railGrid[row][col]) {
                    row++;
                    continue;
                }

                // start of a rail segment
                const start = row;

                while (row < 5 && this.railGrid[row][col]) {
                    row++;
                }

                const end = row - 1;

                rails.push({
                    Column: col,
                    RowStart: start,
                    RowEnd: end,
                });
            }
        }

        this.objdata.Rails = rails;

        const result: PVZObject = {
            aliases: this.aliases,
            objclass: this.objclass,
            objdata: this.objdata,
        };

        const copy: PVZObject<T> = Object.assign({}, result) as PVZObject<T>;

        return copy;
    }

    isEmpty(): boolean {
        return !this.railGrid.some((row) => row.some((cell) => cell));
    }
}
